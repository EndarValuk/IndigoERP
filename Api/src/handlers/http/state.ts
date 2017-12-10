/**
 * Loading dependencies.
 */
import { Request, Response, NextFunction } from "express";
import SystemState from '@indigo/bin/state';
import { SystemStateType } from '@indigo/types';

const stateHandler = (req: Request, res: Response, next: NextFunction) => {
  switch(SystemState.getInstance().currentState) {
    case SystemStateType.NoDatabaseConnection: {
      res.statusCode = 404;
      res.send("NO DB");
    }break;
    default: {
      next();
    }
  }
};

export { stateHandler };