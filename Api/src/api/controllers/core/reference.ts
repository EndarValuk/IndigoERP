// Loading external dependencies.
import { Context } from 'koa';
import { Body, Controller, Ctx, Get, OnUndefined, Params, Post } from 'routing-controllers';
import { Inject } from 'typescript-ioc';

// Loading local dependencies.
import { IHasRepositoryController } from '@indyecm/defs/interfaces';
import { ModuleType } from '@indyecm/defs/types';

import { ReferenceQueryModel } from '@indyecm/api/api/models';
import { ReferenceRepository } from '@indyecm/api/datasource/repositories';

@Controller()
export class ReferenceController implements IHasRepositoryController<ReferenceRepository> {
  @Inject
  public _repository: ReferenceRepository;

  /**
   * Reading all rows from table
   */
  @Post('/reference')
  @OnUndefined(204)
  public async Read(@Ctx() context: Context, @Body() entry: ReferenceQueryModel): Promise<Context> {
    context.body = await this._repository.Read(entry);
    return context;
  }

  @Get('/reference/:project/:level1')
  @Get('/reference/:project/:level1/:level2')
  @OnUndefined(204)
  public async Get(@Ctx() context: Context, @Params() params: any): Promise<Context> {
    let entry: ReferenceQueryModel = new ReferenceQueryModel();

    entry.Project = ModuleType[params.project as keyof typeof ModuleType];
    entry.Levels = [
      params.level1,
      params.level2,
    ];

    context.body = await this._repository.Read(entry);
    return context;
  }
}
