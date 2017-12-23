import { Envelope } from '@indy/datasource/models';

export interface ICanDeleteRepository<K> {
  Delete(key: K): Envelope<boolean> | Promise<Envelope<boolean>>;
}