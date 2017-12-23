// Loading external dependencies.
import { Inject } from "typescript-ioc";
import { Context } from 'koa';
import { Controller, Post, Body, OnUndefined, Ctx } from "routing-controllers";
// Loading local dependencies.
import { IHasRepositoryController } from '@indy/api/controllers/interfaces';
import { ReferenceQueryModel } from '@indy/api/models';
import { ReferenceRepository } from '@indy/datasource/repositories';

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
}