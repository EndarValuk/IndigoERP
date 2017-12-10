/**
 * Loading dependencies.
 */
import { Sequelize, ISequelizeConfig } from 'sequelize-typescript';
import { logger } from './log';
const settings = require('@indigo/config.json');

const config: ISequelizeConfig = {
  logging: (e) => {
    logger.info(e);
  },

  host: settings.database.server,
  port: settings.database.port,
  username: settings.database.user,
  password: settings.database.password,
  database: settings.database.catalogue,
  dialect: settings.database.type,

  modelPaths: [__dirname + '/../datasource/models/core'],

  // SQLite only
  //storage: 'path/to/database.sqlite'
  define: {
    timestamps: false // true by default
  },

  pool: {
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 10000
  },
}
const database = new Sequelize(config);
export { database as databaseHandler };