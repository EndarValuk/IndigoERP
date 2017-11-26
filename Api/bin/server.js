// Loading native cluster
const cluster = require('cluster');

// If its master, then load master code
if(cluster.isMaster) {
  require('./master');
}
// If its worker, then load worker code
else
  require('./worker');