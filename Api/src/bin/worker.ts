/**
 * Loading dependencies.
 */
import * as koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as compression from 'koa-compress';
import * as helmet from 'koa-helmet';
import { Inject } from 'typescript-ioc';
import { useKoaServer } from 'routing-controllers';

// Loading handlers and configuration.
import {
  stateHandler,
  logger,
  poweredHandler,
  timingHandler
} from '@indyecm/api/handlers';
import { databaseHandler as db } from '@indyecm/api/datasource';
// Loading routes.
import { SystemStateType } from '@indyecm/defs/types';
import { Controllers } from '@indyecm/api/api/controllers';
import { StateManager } from './state-manager';
// Loading configuration.
const config = require('@indyecm/api/config.json');

export class Worker {
  private app: koa = new koa();
  @Inject
  private systemState: StateManager;

  public constructor() {
    // Loading & register all application routes
    useKoaServer(this.app, {
      controllers: Controllers,
      cors: {
        credentials: true,
      },
      defaults: {
        paramOptions: {
          // with this option, argument will be required by default
          required: false,
        },
      },
      routePrefix: '/api',
    });

    // In development mode we adding timing watcher.
    if(process.env.NODE_ENV !== 'production') {
      logger.info('Timing watch added.');
      this.app.use(timingHandler);
    }

    // If enabled, adding compression handler
    if(config.api.compress) {
      logger.info('Api response compression enabled.');
      this.app.use(compression());
    }

    this.app.use(bodyParser());
    // this.app.use(bodyParser.urlencoded({ extended: true }));

    // Adding handlers
    this.app.use(poweredHandler);
    this.app.use(stateHandler);

    this.app.use(helmet.xssFilter());
    this.app.use(helmet.frameguard());
    this.app.use(helmet.noSniff());

    // Mount files from project/public in our site on /public
    // this.app.use('/public', express.static(path.join(__dirname,'../public')));

    this.app.listen(config.api.port, async() => {
      logger.info(`Bound at port ${config.api.port}`);
      this.checkDatabase();
    });
  }

  private async checkDatabase(): Promise<void> {
    try {
      await db.authenticate();
      // If we connected to database, log it
      logger.info('Database connection has been established successfully.');
      this.systemState.go(SystemStateType.Working);
    }
    // Else tell about error
    catch(e) {
      this.systemState.go(SystemStateType.NoDatabaseConnection);
      logger.error('Unable to connect to the database:', e.message);
      // And create retry loop
      logger.info(`We will retry in a ${config.database.reconnect / 1000} secs`);
      setTimeout(() => this.checkDatabase(), config.database.reconnect);
    }
  }
}
