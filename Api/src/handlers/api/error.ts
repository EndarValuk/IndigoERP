import { Envelope } from '@indigo/datasource/models';
import { ResultType } from '@indigo/types';

const errorWrapper = (e: Error) => {
  let result: Envelope<Error> = new Envelope<Error>(e, 2);

  console.log(e.name);
  console.log(e.message);
  console.log(e.stack);

  switch(e.name) {
    case "SequelizeHostNotReachableError": {
      result.Type = ResultType.Error;
      result.Message = e.message;
    }break;
    case "SequelizeUniqueConstraintError": {
      result.Type = ResultType.Error;
      result.Message = e.message;
    }break;
    default: {
      result.Type = ResultType.NoResultYet;
      result.Message = e.message;
    }break;
  }
  return result;
}

export { errorWrapper };