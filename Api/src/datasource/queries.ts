// Loading configuration.
const config = require('@indy/config.json');
const queries = require('@indy/queries.json');
// Loading local dependencies.
import { ObjectType } from '@indy/types';

export default class Manager {
  public static Get(application: string, objectType: ObjectType): any {
    let dbQueries = queries[config.database.type];
    let appQueries = dbQueries[application];
    return appQueries[ObjectType[objectType]];
  }
}