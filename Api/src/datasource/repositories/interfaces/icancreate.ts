import { Envelope } from '@indigo/datasource/models';

interface ICanCreateRepository<T> {
  Create(entry: T): Envelope<T> | Promise<Envelope<T>>;
}

export { ICanCreateRepository };