// Loading external dependencies.
import { Context } from 'koa';
import { Body, Controller, Ctx, Get, OnUndefined, Param, Post } from 'routing-controllers';
import { Inject } from 'typescript-ioc';

// Loading local dependencies.
import { IHasRepositoryController } from '@indyecm/defs/interfaces';
import { ObjectActionQueryModel, ObjectQueryModel, QueryModel } from '@indyecm/defs/models';

import { GenericObjectRepository } from '@indyecm/api/datasource/repositories';

@Controller()
export class ObjectActionController implements IHasRepositoryController<GenericObjectRepository> {
  @Inject
  public _repository: GenericObjectRepository;

  /**
   * Reading all rows from table
   */
  @Post('/object/action')
  @OnUndefined(204)
  public async ExecuteAction(@Ctx() context: Context, @Body() entry: ObjectActionQueryModel): Promise<Context> {
    context.body = await this._repository.ExecuteAction(entry);
    return context;
  }

  @Post('/object/logs')
  @OnUndefined(204)
  public async GetLogsByPost(@Ctx() context: Context, @Body() entry: QueryModel): Promise<Context> {
    context.body = await this._repository.GetLogs(entry);
    return context;
  }

  @Get('/object/logs/:objectGuid/:objectType')
  @OnUndefined(204)
  public async GetLogs(@Ctx() context: Context, @Param('objectGuid') objectGuid: number, @Param('objectType') objectType: number): Promise<Context> {
    let mParams: ObjectQueryModel = new ObjectQueryModel();
    mParams.Ref_Object = objectGuid;
    mParams.Ref_ObjectType = objectType;

    context.body = await this._repository.GetLogs(mParams);
    return context;
  }
}
