import { ObjectType, ModuleType } from '@indyecm/defs/types';
import { ICanCreateRepository, ICanDeleteRepository, ICanReadRepository, ICanUpdateRepository } from '@indyecm/defs/interfaces/repositories';

export interface IRepository<T, K> extends
  ICanCreateRepository<T>,
  ICanDeleteRepository<K>,
  ICanReadRepository<T, K>,
  ICanUpdateRepository<T> {

  Application: ModuleType;

  ObjectType: ObjectType;
}
