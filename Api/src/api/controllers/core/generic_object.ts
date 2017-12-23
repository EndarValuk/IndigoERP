// Loading external dependencies.
import { Inject } from "typescript-ioc";
import { Context } from 'koa';
import { Controller, Post, Body, OnUndefined, Ctx, Get, Param } from "routing-controllers";
// Loading local dependencies.
import { IHasRepositoryController } from '@indy/api/controllers/interfaces';
import { ObjectActionQueryModel, ObjectQueryModel, QueryModel } from '@indy/api/models';
import { GenericObjectRepository } from '@indy/datasource/repositories';

@Controller()
export class ObjectActionController implements IHasRepositoryController<GenericObjectRepository> {
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
  async GetLogsByPost(@Ctx() context: Context, @Body() entry: QueryModel): Promise<Context> {
    context.body = await this._repository.GetLogs(entry);
    return context;
  }

  @Get("/object/logs/:objectGuid/:objectType")
  @OnUndefined(204)
  async GetLogs(@Ctx() context: Context, @Param('objectGuid') objectGuid: number, @Param('objectType') objectType: number): Promise<Context> {
    let mParams: ObjectQueryModel = new ObjectQueryModel();
    mParams.Ref_Object = objectGuid;
    mParams.Ref_ObjectType = objectType;

    context.body = await this._repository.GetLogs(mParams);
    return context;
  }
}