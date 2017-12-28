import { ObjectType, ModuleType } from '@indy/types';
import { ICanCreateRepository, ICanDeleteRepository, ICanReadRepository, ICanUpdateRepository } from '@indy/datasource/repositories/interfaces';

export interface IRepository<T, K> extends
  ICanCreateRepository<T>,
  ICanDeleteRepository<K>,
  ICanReadRepository<T, K>,
  ICanUpdateRepository<T> {

  Application: ModuleType;

  ObjectType: ObjectType;
}