import { Envelope } from '@indyecm/defs/models';

export interface ICanCreateRepository<T> {
  Create(entry: T): Envelope<T> | Promise<Envelope<T>>;
}
