// Loading external dependencies.
import { Inject } from "typescript-ioc";
import { Context } from 'koa';
import { Controller, Post, Body, OnUndefined, Ctx, Params, Get } from "routing-controllers";
// Loading local dependencies.
import { IHasRepositoryController } from '@indy/api/controllers/interfaces';
import { ReferenceQueryModel } from '@indy/api/models';
import { ReferenceRepository } from '@indy/datasource/repositories';
import { ModuleType } from '@indy/types';

@Controller()
export class ReferenceController implements IHasRepositoryController<ReferenceRepository> {
  @Inject
  _repository: ReferenceRepository;

  /**
   * Reading all rows from table
   */
  @Post("/reference")
  @OnUndefined(204)
  async Read(@Ctx() context: Context, @Body() entry: ReferenceQueryModel): Promise<Context> {
    context.body = await this._repository.Read(entry);
    return context;
  }

  @Get("/reference/:project/:level1")
  @Get("/reference/:project/:level1/:level2")
  @OnUndefined(204)
  async Get(@Ctx() context: Context, @Params() params: any): Promise<Context> {
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