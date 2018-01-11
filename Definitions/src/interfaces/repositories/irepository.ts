import { ICanCreateRepository, ICanDeleteRepository, ICanReadRepository, ICanUpdateRepository } from '@indyecm/defs/interfaces/repositories';
import { ModuleType, ObjectType } from '@indyecm/defs/types';

export interface IRepository<T, K> extends
  ICanCreateRepository<T>,
  ICanDeleteRepository<K>,
  ICanReadRepository<T, K>,
  ICanUpdateRepository<T> {

  Application: ModuleType;

  ObjectType: ObjectType;
}
