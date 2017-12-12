import { Envelope } from '@indigo/datasource/models';
import { ResultType } from '@indigo/types';

const errorWrapper = (e: Error) => {
  let result: Envelope<Error> = new Envelope<Error>();

  switch(e.name) {
    case "SequelizeHostNotReachableError": {
      result.Type = ResultType.ErrorDatabaseConnection;
      result.Message = e.message;
    }break;
    case "SequelizeUniqueConstraintError": {
      result.Type = ResultType.ErrorDatabaseCreateExists;
      result.Message = e.message;
    }break;
    case "SequelizeDatabaseError": {
      result.Type = ResultType.ErrorDatabase;
      result.Message = e.message;
    }break;
    default: {
      result.Type = ResultType.Error;
      result.Message = e.message;

      console.log(e.name);
      console.log(e.message);
      console.log(e.stack);
    }break;
  }
  return result;
}

export { errorWrapper };