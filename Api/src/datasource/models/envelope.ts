import { ResultType } from '@indy/types';

export class Envelope<T> {
  public readonly Type: ResultType = ResultType.NoResultYet;

  public readonly Value?: T | Error;

  public readonly Message?: string;

  public readonly IsSuccessful: boolean;

  public constructor(resultType?: ResultType, value?: T | Error, message?: string) {
    if(resultType) {
      this.Type = resultType;
    }
    this.Value = value;
    this.Message = message;

    if(value && value instanceof Error) {
      switch(value.name) {
        case "SequelizeHostNotReachableError": {
          this.Type = ResultType.ErrorDatabaseConnection;
        }break;
        case "SequelizeUniqueConstraintError": {
          this.Type = ResultType.ErrorDatabaseCreateExists;
        }break;
        case "SequelizeDatabaseError": {
          this.Type = ResultType.ErrorDatabase;
        }break;
        default: {
          this.Type = ResultType.Error;
 
          console.log(value.name);
          console.log(value.message);
          console.log(value.stack);
        }break;
      }
      this.Value = undefined;
      this.Message = value.message;
    }

    let hasError = (this.Type & ResultType.Error) === ResultType.Error;
    let nyi = (this.Type & ResultType.NYI) === ResultType.NYI;
    let nyr = (this.Type & ResultType.NoResultYet) === ResultType.NoResultYet;
    this.IsSuccessful = !hasError && !nyi && !nyr;
  }
}