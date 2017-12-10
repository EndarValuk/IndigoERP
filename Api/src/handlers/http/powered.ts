/**
 * Loading dependencies.
 */
import { Request, Response, NextFunction } from "express";

const poweredHandler = (req: Request, res: Response, next: NextFunction) => {
  // Set our own header here
  res.setHeader('X-Powered-By', 'IndigoERP');
  next();
};

export { poweredHandler };