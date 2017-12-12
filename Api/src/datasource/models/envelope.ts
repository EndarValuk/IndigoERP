import { ResultType } from '@indigo/types';

class Envelope<T> {
  public Type: ResultType = ResultType.NoResultYet;

  public Value?: T;

  public Message?: string;

  public constructor(resultType?: ResultType, value?: T, message?: string) {
    this.Type = resultType || ResultType.NoResultYet;
    this.Value = value;
    this.Message = message;
  }
}

export { Envelope };