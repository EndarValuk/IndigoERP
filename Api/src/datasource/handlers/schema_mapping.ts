// Loading configuration.
const config = require('@indyecm/api/config.json');
const databaseDefinition = require('@indyecm/api/datasource/schema-config.json');
// Loading local dependencies.
import { ModuleType, ObjectType } from '@indyecm/defs/types';
import { logger } from '@indyecm/api/handlers'

export class SchemaMappingHandler {
  public static GetDatabaseConfig(): any {
    let dbQueries = databaseDefinition[config.database.type];
    if(!dbQueries) {
      logger.error(`Cannot read "${config.database.type}" datasource schema`);

      return null;
    }
    else
      return dbQueries;
  }

  public static GetObjectConfig(application: ModuleType, objectType: ObjectType): any {
    let dbQueries = databaseDefinition[config.database.type];
    if(!dbQueries) {
      logger.error(`Cannot read "${config.database.type}" datasource schema`);

      return null;
    }

    let appQueries = dbQueries[ModuleType[application]];
    if(!appQueries) {
      logger.error(`Module "${ModuleType[application]}" not found in ${config.database.type} datasource schema`);

      return null;
    }
    let objectQueries = appQueries[ObjectType[objectType]];
    if(!objectQueries) {
      logger.error(`ObjectType "${ObjectType[objectType]}" not found in datasource schema for "${ModuleType[application]}" module`);

      return null;
    }
    return objectQueries;
  }
}
