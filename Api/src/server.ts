// Loading shims.
import "reflect-metadata";
// Loading native cluster and IoC container
import * as cluster from 'cluster';
import { Inject } from 'typescript-ioc';
// Local dependencies
import { Master } from './bin/master';
import { Worker } from './bin/worker';
import { SystemStateType } from '@indy/types';
import { StateManager } from './bin/state-manager';

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