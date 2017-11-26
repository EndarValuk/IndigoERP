/**
 * Loading dependencies.
 */
const express        = require('express');
const path           = require('path');
const bodyParser     = require('body-parser');
const app            = express();
/**
 * Loading handlers and configuration.
 */
const config         = require('../config.json');
const db             = require('../handlers/db');
const logger         = require('../handlers/log');

/**
 * In development mode we adding timing watcher.
 */
if (process.env.NODE_ENV !== 'production') {
  app.use(require('../handlers/timing'));
}

// Mount files from project/public in our site on /public
app.use('/public', express.static(path.join(__dirname,'../public')));
// Loading routes
require('../routes')(app, db);

// Adding error handler
app.use(require('../handlers/error'));

app.listen(config.api.port, function(err) {
  // If we have an error, throw ir
  if(err)
    throw err;

  db.authenticate()
  // If we connected to database, log it
  .then(() => {
    logger.info('Database connection has been established successfully.');
    logger.info(`Running server at port ${config.api.port}!`);
  })
  // Else tell about error
  .catch(err => {
    logger.error('Unable to connect to the database:', err);
    throw err;
  });
});