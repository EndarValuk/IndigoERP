import { Envelope, ObjectQueryModel, QueryModel } from '@indyecm/defs/models';

export interface ICanReadRepository<T, K> {
  Read(key: K | QueryModel): Envelope<T> | Promise<Envelope<T>>;

  ReadAll(key?: ObjectQueryModel | QueryModel): Envelope<T[]> | Promise<Envelope<T[]>>;
}
