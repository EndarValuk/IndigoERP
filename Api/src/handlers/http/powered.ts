// Loading external dependencies.
import { Context } from "koa";

export const poweredHandler = async(ctx: Context, next: () => Promise<void>) => {
  // Set our own powered header here
  ctx.set('X-Powered-By', 'IndyECM API');
  next();
};