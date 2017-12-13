import { Envelope } from '@indigo/datasource/models';
import { ReferenceQueryModel } from '@indigo/api/models';

interface ICanReadRepository<T, K> {
  Read(key: K | ReferenceQueryModel): Envelope<T> | Promise<Envelope<T>>;

  ReadAll(key?: ReferenceQueryModel): Envelope<T[]> | Promise<Envelope<T[]>>;
}

export { ICanReadRepository };