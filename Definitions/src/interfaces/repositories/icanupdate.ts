import { Envelope } from '@indyecm/defs/models';

export interface ICanUpdateRepository<T> {
  Update(entry: T): Envelope<T> | Promise<Envelope<T>>;
}
