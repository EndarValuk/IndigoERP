// Loading configuration.
const config = require('@indy/config.json');
const databaseDefinition = require('@indy/datasource/schema-config.json');
// Loading local dependencies.
import { ModuleType, ObjectType } from '@indy/types';

export const Mapper = (application: ModuleType, objectType: ObjectType): any => {
  let dbQueries = databaseDefinition[config.database.type];
  let appQueries = dbQueries[ModuleType[application]];
  return appQueries[ObjectType[objectType]];
}