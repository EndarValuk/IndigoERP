// Loading external dependencies.
import * as HttpCodes from 'http-status-codes';
import { Context } from 'koa';

// Loading local dependencies.
import { SystemStateType } from '@indyecm/defs/types';

import { StateManager } from '@indyecm/api/bin/state-manager';

export const stateHandler = async(ctx: Context, next: () => Promise<void>) => {
  let systemState = new StateManager();

  switch(systemState.currentState) {
    case SystemStateType.NoDatabaseConnection: {
      ctx.status = HttpCodes.SERVICE_UNAVAILABLE;
      ctx.message = HttpCodes.getStatusText(ctx.status);
      ctx.body = 'NO DB';
    }break;
    default: {
      return next();
    }
  }
};
