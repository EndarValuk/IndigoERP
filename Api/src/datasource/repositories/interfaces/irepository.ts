import { ObjectType } from '@indigo/types';
import { ICanCreateRepository, ICanDeleteRepository, ICanReadRepository, ICanUpdateRepository } from '@indigo/datasource/repositories/interfaces';

interface IRepository<T, K> extends
  ICanCreateRepository<T>,
  ICanDeleteRepository<K>,
  ICanReadRepository<T, K>,
  ICanUpdateRepository<T> {

  Application: string;

  ObjectType: ObjectType;
 }

export { IRepository };