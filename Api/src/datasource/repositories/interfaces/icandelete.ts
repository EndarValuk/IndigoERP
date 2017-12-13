import { Envelope } from '@indigo/datasource/models';

interface ICanDeleteRepository<K> {
  Delete(key: K): Envelope<boolean> | Promise<Envelope<boolean>>;
}

export { ICanDeleteRepository };