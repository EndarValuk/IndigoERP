import { Envelope } from '@indyecm/defs/models';

export interface ICanDeleteRepository<K> {
  Delete(key: K): Envelope<boolean> | Promise<Envelope<boolean>>;
}
