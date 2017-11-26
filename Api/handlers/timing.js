/**
 * Loading dependencies.
 */
const logger = require('./log');

module.exports = function(req,res,next)
{
  // Check start time
  let beginTime = Date.now();
  // Check end time
  res.on('finish',()=>{
    let d =  Date.now();
    logger.debug('Reponse time: ' + (d - beginTime),{
      url:req.url,
      time:(d - beginTime)
    });
  });
  // Continue to the next handler
  next();
}