/**
 * Loading dependencies.
 */
import * as express from 'express';
import * as path from 'path';
import * as compression from 'compression';
import * as bodyParser from "body-parser";
import { useExpressServer } from "routing-controllers";
/**
 * Loading handlers and configuration.
 */
import {
  databaseHandler as db,
  stateHandler,
  logger,
  poweredHandler,
  timingHandler
} from '@indigo/handlers';
/**
 * Loading routes.
 */
import { Controllers } from '@indigo/api/controllers';
import { SystemStateType } from '@indigo/types';
import SystemState from './state';

const config = require('@indigo/config.json');

export class Worker {
  private app: express.Application = express();

  public constructor() {
    /**
     * In development mode we adding timing watcher.
     */
    if (process.env.NODE_ENV !== 'production') {
      logger.info('Timing watch added.');
      this.app.use(timingHandler);
    }

    // If enabled, adding compression handler
    if(config.api.compress) {
      logger.info('Api response compression enabled.');
      this.app.use(compression());
    }

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    // Adding handlers
    this.app.use(stateHandler);
    this.app.use(poweredHandler);

    // Mount files from project/public in our site on /public
    this.app.use('/public', express.static(path.join(__dirname,'../public')));

    // Loading & register all application routes
    useExpressServer(this.app, {
      defaults: {
        paramOptions: {
          //with this option, argument will be required by default
          required: false,
        }
      },
      routePrefix: '/api',
      controllers: Controllers,
      classTransformer: false
    });

    SystemState.getInstance().go(SystemStateType.Starting);

    this.app.listen(config.api.port, async() => {
      logger.info(`Bound at port ${config.api.port}!`);
      this.checkDatabase();
    });
  }

  private async checkDatabase(): Promise<void> {
    try {
      await db.authenticate();
      // If we connected to database, log it
      logger.info('Database connection has been established successfully.');
      SystemState.getInstance().go(SystemStateType.Working)
    }
    // Else tell about error
    catch(e) {
      SystemState.getInstance().go(SystemStateType.NoDatabaseConnection);
      logger.error('Unable to connect to the database:', e);

      setTimeout(() => {
        this.checkDatabase();
      }, 5000);
    };
  }
}