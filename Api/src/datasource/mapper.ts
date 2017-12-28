// Loading configuration.
const config = require('@indy/config.json');
const databaseDefinition = require('@indy/datasource/schema-config.json');
// Loading local dependencies.
import { ApplicationType, ObjectType } from '@indy/types';

export const Mapper = (application: ApplicationType, objectType: ObjectType): any => {
  let dbQueries = databaseDefinition[config.database.type];
  let appQueries = dbQueries[ApplicationType[application]];
  return appQueries[ObjectType[objectType]];
}