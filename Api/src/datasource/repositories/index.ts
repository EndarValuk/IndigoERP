// Loading local dependencies.
import { IRepository } from '@indyecm/defs/interfaces';
import { Envelope, ObjectQueryModel, QueryModel } from '@indyecm/defs/models';
import { ModuleType, ObjectType } from '@indyecm/defs/types';

import { SchemaMappingHandler } from '@indyecm/api/datasource/handlers';

abstract class BaseRepository<T, TK> implements IRepository<T, TK> {
  public QueryManager: any;

  public Application: ModuleType;

  public ObjectType: ObjectType;

  public constructor(objectType: ObjectType, application: ModuleType = ModuleType.Core) {
    this.ObjectType = objectType;
    this.Application = application;

    this.QueryManager = SchemaMappingHandler.GetObjectConfig(this.Application, this.ObjectType);
  }

  public Read(key: TK | QueryModel): Envelope<T> | Promise<Envelope<T>> {
    throw new Error('Method not implemented.');
  }

  public ReadAll(key?: ObjectQueryModel | QueryModel): Envelope<T[]> | Promise<Envelope<T[]>> {
    throw new Error('Method not implemented.');
  }

  public Create(entry: T): Envelope<T> | Promise<Envelope<T>> {
    throw new Error('Method not implemented.');
  }

  public Update(entry: T): Envelope<T> | Promise<Envelope<T>> {
    throw new Error('Method not implemented.');
  }

  public Delete(key: TK): Envelope<boolean> | Promise<Envelope<boolean>> {
    throw new Error('Method not implemented.');
  }
}

export { BaseRepository };
export * from './core/generic_object';
export * from './core/reference';

export * from './anubis/users';
