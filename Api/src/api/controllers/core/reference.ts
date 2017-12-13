import { Controller, Post, Body, OnUndefined } from "routing-controllers";
import { Inject } from "typescript-ioc";

import { BaseController } from '@indigo/api/controllers/interfaces';
import { ReferenceQueryModel } from "@indigo/api/models";
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
  Read(@Body() entry: ReferenceQueryModel): any {
    return this._repository.Read(entry);
  }
}