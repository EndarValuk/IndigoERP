// Native cluster and logger.
import { cpus } from "os";
import * as cluster from 'cluster';
// Loading local dependencies.
import { logger } from '@indyecm/api/handlers';

export class Master {
  public constructor() {
    // Checking number of cpu cores.
    let CPUCount = cpus().length;
    logger.info(`This machine has ${CPUCount} CPUs`);
    // Recommended to use 1 while in active development.
    if(process.env.NODE_ENV !== 'production') {
      CPUCount = 1;
      logger.info(`But in development we well use only ${CPUCount}`);
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