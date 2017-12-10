/**
 * Loading dependencies.
 */
import { Request, Response, NextFunction } from "express";
import { logger } from '@indigo/handlers';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message);
  res.status(503).send(err.stack || err.message);
};

export { errorHandler };