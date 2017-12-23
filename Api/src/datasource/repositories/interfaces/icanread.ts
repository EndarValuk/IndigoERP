import { Envelope } from '@indy/datasource/models';
import { ReferenceQueryModel } from '@indy/api/models';

export interface ICanReadRepository<T, K> {
  Read(key: K | ReferenceQueryModel): Envelope<T> | Promise<Envelope<T>>;

  ReadAll(key?: ReferenceQueryModel): Envelope<T[]> | Promise<Envelope<T[]>>;
}