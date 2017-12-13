import { Envelope } from '@indigo/datasource/models';

interface ICanUpdateRepository<T> {
  Update(entry: T): Envelope<T> | Promise<Envelope<T>>;
}

export { ICanUpdateRepository };