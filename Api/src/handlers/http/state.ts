/**
 * Loading dependencies.
 */
import { Request, Response, NextFunction } from "express";
import * as HttpCodes from 'http-status-codes'

import { StateManager } from '@indigo/bin/state-manager';
import { SystemStateType } from '@indigo/types';

const stateHandler = (req: Request, res: Response, next: NextFunction) => {
  let systemState = new StateManager();

  switch(systemState.currentState) {
    case SystemStateType.NoDatabaseConnection: {
      res.statusCode = HttpCodes.SERVICE_UNAVAILABLE;
      res.statusMessage = HttpCodes.getStatusText(res.statusCode);
      res.send("NO DB");
    }break;
    default: {
      next();
    }
  }
};

export { stateHandler };