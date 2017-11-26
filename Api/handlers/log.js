/**
 * Loading dependencies.
 */
const { createLogger, format, transports,  } = require('winston');
const { combine, timestamp, label, printf } = format;

// Setting message log format
const myFormat = printf(info => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

const logger = createLogger({
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.Console(),
  ]
});

module.exports = logger;