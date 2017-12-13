import { Envelope } from '@indigo/datasource/models';
import { ReferenceQueryModel } from '@indigo/api/models/core/reference';

interface BaseRepository<T, K> {
  Read(key: K | ReferenceQueryModel): Envelope<T> | Promise<Envelope<T>>;

  ReadAll(): Envelope<T[]> | Promise<Envelope<T[]>>;

  Create(entry: T): Envelope<T> | Promise<Envelope<T>>;

  Update(entry: T): Envelope<T> | Promise<Envelope<T>>;

  Delete(key: K): Envelope<boolean> | Promise<Envelope<boolean>>;
}

export { BaseRepository };