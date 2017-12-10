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
  errorHandler,
  logger,
  poweredHandler,
  timingHandler
} from '@indigo/handlers';
/**
 * Loading routes.
 */
import { Controllers } from '@indigo/api/controllers';

const config = require('@indigo/config.json');

export class Worker {
  public constructor() {
    let app: express.Application = express();

    /**
     * In development mode we adding timing watcher.
     */
    if (process.env.NODE_ENV !== 'production') {
      logger.info('Timing watch added.');
      app.use(timingHandler);
    }

    // If enabled, adding compression handler
    if(config.api.compress) {
      logger.info('Api response compression enabled.');
      app.use(compression());
    }

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Adding error handler
    app.use(errorHandler);
    app.use(poweredHandler);

    // Mount files from project/public in our site on /public
    app.use('/public', express.static(path.join(__dirname,'../public')));

    // Loading & register all application routes
    useExpressServer(app, {
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

    app.listen(config.api.port, async() => {
      logger.info(`Bound at port ${config.api.port}!`);
      try {
        await db.authenticate();
        // If we connected to database, log it
        logger.info('Database connection has been established successfully.');
      }
      // Else tell about error
      catch(e) {
        logger.error('Unable to connect to the database:', e);
      };
    });
  }
}