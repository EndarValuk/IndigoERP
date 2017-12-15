// Loading shims.
import "reflect-metadata";
// Loading native cluster
import * as cluster from 'cluster';
import { Master } from './bin/master';
import { Worker } from './bin/worker';
// Local dependencies
import { SystemStateType } from '@indigo/types';
import { StateManager } from './bin/state-manager';
import { Inject } from 'typescript-ioc';

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
      new Master();
    }
    // If its worker, then load worker code
    else {
      new Worker();
    }
  }
}

new Server();