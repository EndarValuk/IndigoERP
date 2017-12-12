/**
 * Loading dependencies.
 */
import * as logger from "winston";

logger.configure({
  //level: 'debug',
  transports: [
    new logger.transports.Console({
      colorize: true,
      timestamp: true
    })
  ]
});

export { logger };
export default { logger };