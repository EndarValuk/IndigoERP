// Loading external dependencies.
import { Inject } from "typescript-ioc";
import { Context } from 'koa';
import { Controller, Post, Body, OnUndefined, Ctx } from "routing-controllers";
// Loading local dependencies.
import { BaseController } from '@indigo/api/controllers/interfaces';
import { ObjectActionQueryModel, ObjectQueryModel } from '@indigo/api/models';
import { GenericObjectRepository } from '@indigo/datasource/repositories';

@Controller()
export class ObjectActionController implements BaseController<GenericObjectRepository> {
  @Inject
  _repository: GenericObjectRepository;

  /**
   * Reading all rows from table
   */
  @Post("/object/action")
  @OnUndefined(204)
  async ExecuteAction(@Ctx() context: Context, @Body() entry: ObjectActionQueryModel): Promise<Context> {
    context.body = await this._repository.ExecuteAction(entry);
    return context;
  }

  @Post("/object/logs")
  @OnUndefined(204)
  async GetLogs(@Ctx() context: Context, @Body() entry: ObjectQueryModel): Promise<Context> {
    context.body = await this._repository.GetLogs(entry);
    return context;
  }
}