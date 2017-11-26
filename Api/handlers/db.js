/**
 * Loading dependencies.
 */
const Sequelize      = require('sequelize');
const settings       = require('../config.json');

// Setting options
const options = {
  host: settings.database.server,
  port: settings.database.port,
  username: settings.database.user,
  password: settings.database.password,
  database: settings.database.catalogue,
  dialect: settings.database.type,

  // SQLite only
  //storage: 'path/to/database.sqlite'
  define: {
    timestamps: false // true by default
  },

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
};

const sequelize = new Sequelize(options);
module.exports = sequelize;