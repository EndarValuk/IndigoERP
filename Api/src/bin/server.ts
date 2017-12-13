// Loading native cluster
import * as cluster from 'cluster';
import { Master } from './master';
import { Worker } from './worker';

import { SystemStateType } from '@indigo/types';
import { StateManager } from './state-manager';
import { Inject } from 'typescript-ioc';

export class Server {
  @Inject
  private systemState: StateManager;

  constructor() {
    this.systemState.go(SystemStateType.Starting);

    // If its master, then load master code
    if(cluster.isMaster) {
      new Master();
    }
    // If its worker, then load worker code
    else {
      new Worker();
    }
  }
}

new Server();