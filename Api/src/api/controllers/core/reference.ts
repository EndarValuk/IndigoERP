// Loading external dependencies.
import { Inject } from "typescript-ioc";
import { Context } from 'koa';
import { Controller, Post, Body, OnUndefined, Ctx } from "routing-controllers";
// Loading local dependencies.
import { BaseController } from '@indigo/api/controllers/interfaces';
import { ReferenceQueryModel } from '@indigo/api/models';
import { ReferenceRepository } from '@indigo/datasource/repositories';

@Controller()
export class ReferenceController implements BaseController<ReferenceRepository> {
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