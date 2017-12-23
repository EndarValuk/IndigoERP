import { Envelope } from '@indy/datasource/models';

export interface ICanUpdateRepository<T> {
  Update(entry: T): Envelope<T> | Promise<Envelope<T>>;
}