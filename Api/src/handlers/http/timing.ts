// Loading external dependencies.
import { Request, Response, NextFunction } from "express";
// Loading local dependencies.
import { logger } from '@indigo/handlers';

/**
 * 
 * @param req 
 * @param res 
 * @param next 
 */
const timingHandler = (req: Request, res: Response, next: NextFunction) => {
  // Check start time
  let beginTime = Date.now();
  // Check end time
  res.addListener('finish', () => {
    let d =  Date.now();
    logger.info(`Reponse time: ${req.url}: ${(d - beginTime)}ms`);
  });
  // Continue to the next handler
  next();
};

export { timingHandler };