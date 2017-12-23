import { Envelope } from '@indigo/datasource/models';

export interface ICanUpdateRepository<T> {
  Update(entry: T): Envelope<T> | Promise<Envelope<T>>;
}