// Loading local dependencies.
import { IRepository } from '@indyecm/defs/interfaces';
import { Envelope, ObjectQueryModel, QueryModel } from '@indyecm/defs/models';
import { ObjectType, ModuleType } from '@indyecm/defs/types';

import { SchemaMappingHandler } from '@indyecm/api/datasource/handlers';

abstract class BaseRepository<T, TK> implements IRepository<T, TK> {
  public QueryManager: any;

  public Application: ModuleType;

  public ObjectType: ObjectType;

  constructor(objectType: ObjectType, application: ModuleType = ModuleType.Core) {
    this.ObjectType = objectType;
    this.Application = application;

    this.QueryManager = SchemaMappingHandler.GetObjectConfig(this.Application, this.ObjectType);
  }

  Read(key: TK | QueryModel): Envelope<T> | Promise<Envelope<T>> {
    throw new Error("Method not implemented.");
  }

  ReadAll(key?: ObjectQueryModel | QueryModel): Envelope<T[]> | Promise<Envelope<T[]>> {
    throw new Error("Method not implemented.");
  }

  Create(entry: T): Envelope<T> | Promise<Envelope<T>> {
    throw new Error("Method not implemented.");
  }

  Update(entry: T): Envelope<T> | Promise<Envelope<T>> {
    throw new Error("Method not implemented.");
  }

  Delete(key: TK): Envelope<boolean> | Promise<Envelope<boolean>> {
    throw new Error("Method not implemented.");
  }
}

export { BaseRepository };
export * from './core/generic_object';
export * from './core/reference';

export * from './anubis/users';