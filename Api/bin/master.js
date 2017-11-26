/**
 * Loading dependencies.
 * Native cluster and logger.
 */
const cluster = require('cluster');
const logger = require('../handlers/log');
/**
 * Checking number of cpu cores.
 * Recommended to use 1 while in active development.
 */
let CPUCount = 0;
if(process.env.NODE_ENV !== 'production') {
  CPUCount = 1;
}
else
  CPUCount = require('os').cpus().length

// In case of IPC disconnect, wakeup new worker
cluster.on('disconnect', (worker, code, signal) => {
  // Log diconnection
  logger.log(`Worker ${worker.id} died`);
  // Create new worker
  cluster.fork();
});

// If worker connected, log it
cluster.on('online', (worker) => {
  logger.info(`Worker ${worker.id} running`);
});

// Create workers equal to CPUCount
for(let i = 0; i < CPUCount; ++i)
{
  cluster.fork();
}