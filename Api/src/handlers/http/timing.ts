// Loading external dependencies.
import { Context } from "koa";
// Loading local dependencies.
import { logger } from '@indigo/handlers';

/**
 * 
 * @param ctx 
 * @param next 
 */
const timingHandler = async(ctx: Context, next: () => Promise<void>) => {
  // Check start time
  let beginTime = Date.now();
  // Await for other middleware to run
  await next();
  // Check end time
  let endTime = Date.now();
  let delta = Math.ceil(endTime - beginTime);
  ctx.set('X-Response-Time', delta + 'ms');
  logger.info(`Reponse time: ${ctx.url}: ${delta}ms`);
};

export { timingHandler };