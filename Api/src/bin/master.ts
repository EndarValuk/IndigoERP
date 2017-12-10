/**
 * Loading shims.
 */
require('module-alias/register');
import "reflect-metadata";
/**
 * Loading dependencies.
 * Native cluster and logger.
 */
import { cpus } from "os";
import * as cluster from 'cluster';

import { logger } from '@indigo/handlers';

export class Master {
  public constructor() {
    // Checking number of cpu cores.
    let CPUCount = cpus().length;
    logger.info(`This machine has ${CPUCount} CPUs`);
    // Recommended to use 1 while in active development.
    if(process.env.NODE_ENV !== 'production') {
      logger.info('But in development we well use only one');
      CPUCount = 1;
    }

    // In case of IPC disconnect, wakeup new worker
    cluster.on('disconnect', (worker) => {
      // Log diconnection
      logger.info(`Worker ${worker.id} died`);
      // Create new worker
      cluster.fork();
    });

    // If worker connected, log it
    cluster.on('online', (worker) => {
      logger.info(`Worker ${worker.id} running`);
    });

    // Create workers equal to CPUCount
    for(let i = 0; i < CPUCount; ++i) {
      cluster.fork();
    }
  }
}