import { ReferenceQueryModel } from '@indy/api/models';
import { Envelope } from '@indy/datasource/models';
import { IRepository } from '@indy/datasource/repositories/interfaces';
import { SchemaMappingHandler } from '@indy/datasource/handlers';
import { ObjectType, ModuleType } from '@indy/types';

abstract class BaseRepository<T, TK> implements IRepository<T, TK> {
  public QueryManager: any;

  public Application: ModuleType;

  public ObjectType: ObjectType;

  constructor(objectType: ObjectType, application: ModuleType = ModuleType.Core) {
    this.ObjectType = objectType;
    this.Application = application;

    this.QueryManager = SchemaMappingHandler.GetObjectConfig(this.Application, this.ObjectType);
  }

  Read(key: TK | ReferenceQueryModel): Envelope<T> | Promise<Envelope<T>> {
    throw new Error("Method not implemented.");
  }

  ReadAll(): Envelope<T[]> | Promise<Envelope<T[]>> {
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