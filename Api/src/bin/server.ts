// Loading native cluster
import * as cluster from 'cluster';
import { Master } from './master';
import { Worker } from './worker';

// If its master, then load master code
if(cluster.isMaster) {
  new Master();
}
// If its worker, then load worker code
else {
  new Worker();
}