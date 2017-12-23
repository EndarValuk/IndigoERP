import { Envelope } from '@indigo/datasource/models';

export interface ICanDeleteRepository<K> {
  Delete(key: K): Envelope<boolean> | Promise<Envelope<boolean>>;
}