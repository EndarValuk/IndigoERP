import { Envelope } from '@indy/datasource/models';

export interface ICanCreateRepository<T> {
  Create(entry: T): Envelope<T> | Promise<Envelope<T>>;
}