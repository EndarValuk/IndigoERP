// Loading configuration.
const config = require('@indigo/config.json');
const queries = require('@indigo/queries.json');
import { ObjectType } from '@indigo/types';

class Manager {
  public static Get(application: string, objectType: ObjectType): any {
    let dbQueries = queries[config.database.type];
    let appQueries = dbQueries[application];
    return appQueries[ObjectType[objectType]];
  }
}

export default Manager;