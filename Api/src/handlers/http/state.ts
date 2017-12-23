// Loading external dependencies.
import { Context } from "koa";
import * as HttpCodes from 'http-status-codes'
// Loading local dependencies.
import { StateManager } from '@indy/bin/state-manager';
import { SystemStateType } from '@indy/types';

export const stateHandler = async(ctx: Context, next: () => Promise<void>) => {
  let systemState = new StateManager();

  switch(systemState.currentState) {
    case SystemStateType.NoDatabaseConnection: {
      ctx.status = HttpCodes.SERVICE_UNAVAILABLE;
      ctx.message = HttpCodes.getStatusText(ctx.status);
      ctx.body = "NO DB";
    }break;
    default: {
      return next();
    }
  }
};