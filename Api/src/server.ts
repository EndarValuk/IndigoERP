// Loading shims.
import 'reflect-metadata';

// Loading external dependencies.
import * as cluster from 'cluster';
import { Inject } from 'typescript-ioc';

// Loading local dependencies.
import { SystemStateType } from '@indyecm/defs/types';

import { Master } from './bin/master';
import { StateManager } from './bin/state-manager';
import { Worker } from './bin/worker';

/**
 * Application startup class
 */
export class Server {
  @Inject
  private systemState: StateManager;

  constructor() {
    this.systemState.go(SystemStateType.Starting);

    // If its master, then load master code
    if(cluster.isMaster) {
      // tslint:disable-next-line:no-unused-expression
      new Master();
    }
    // If its worker, then load worker code
    else {
      // tslint:disable-next-line:no-unused-expression
      new Worker();
    }
  }
}

// tslint:disable-next-line:no-unused-expression
new Server();
