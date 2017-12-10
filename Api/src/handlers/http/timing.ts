/**
 * Loading dependencies.
 */
import { Request, Response, NextFunction } from "express";
import { logger } from '@indigo/handlers';

const timingHandler = (req: Request, res: Response, next: NextFunction) => {
  // Check start time
  let beginTime = Date.now();
  // Check end time
  res.addListener('finish', () => {
    let d =  Date.now();
    logger.debug(`Reponse time: ${req.url}: ${(d - beginTime)}`);
  });
  // Continue to the next handler
  next();
};
export { timingHandler };