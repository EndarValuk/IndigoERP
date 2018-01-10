// Loading external dependencies.
import { IDefineOptions } from 'sequelize-typescript/lib/interfaces/IDefineOptions';
// Loading local dependencies.
import { ObjectQueryModel, QueryModel } from '@indyecm/defs/models';
import { ObjectType } from '@indyecm/defs/types';

import { ReferenceQueryModel } from '@indyecm/api/api/models';
import { SchemaMappingHandler } from './schema_mapping';

/**
 * Helper class for generating queries against datasource.
 * Useful for generic queries and transforming HTTP requests to SQL queries.
 */
export class QueryBuildHandler {

//#region Static methods used for query generation

  public static GetOrmQuery(entry?: ObjectQueryModel | QueryModel): any {
    let q: any;

    if(entry && entry instanceof QueryModel) {
      q = {
        attributes: [''],
        group: [''],
        where: {}
      };

      if(entry.FieldsPredicate) {
        q.attributes = [];
        let fieldsArray = entry.FieldsPredicate.toLowerCase().split(',');
        for(let field in fieldsArray) {
          q.attributes.push(fieldsArray[field].toLowerCase().trim());
        }
      }
      else
        delete q.attributes;

      if(entry.GroupBy) {
        q.group = entry.GroupBy.toLowerCase().split(',');
      }
      else
        delete q.group;

      if(entry.WherePredicate) {
        q.where = JSON.parse(JSON.stringify(entry.WherePredicate));
      }
      else
        delete q.where;
    }
    else if(entry && entry instanceof ObjectQueryModel) {
      q = {
        where: {
          ref_object: entry.Ref_Object,
          ref_object_type: entry.Ref_ObjectType
        }
      };
    }
    else {
      q = null;
    }
    return q;
  }

  public static GetOrmObjectWhereQuery(objectGuid: number, objectType: ObjectType): any {
    return {
      where: {
        ref_object: objectGuid,
        ref_object_type: objectType
      }
    }
  }

  public static GetReferenceSelectQuery(request: ReferenceQueryModel) : string {
    let table = '';

    request.Levels.forEach(element => {
      table += `_${element}`;
    });
    table = table.slice(1, table.length);
    // Reading database schema mapping.
    let schema: IDefineOptions = SchemaMappingHandler.GetObjectConfig(request.Project, ObjectType.Generic).$schema_definitions.references[table];
    if(!schema) {
      return "";
    }
    let dbSpecific = SchemaMappingHandler.GetDatabaseConfig().$schema_delimiter;
    table = `${dbSpecific.begin}${schema.schema}${dbSpecific.end}.${dbSpecific.begin}${schema.tableName}${dbSpecific.end}`
    return QueryBuildHandler.GetPlainSelectTableQuery(request, table);
  }

  public static GetPlainSelectTableQuery(request: QueryModel, table: string): string {
    let queryTemplate = "SELECT ";
    // Checking unique constraint
    if(request.Distinct) {
      queryTemplate += "DISTINCT";
    }
    // Проверяем, задано ли условие ограничения по набору столбцов
    queryTemplate += request.FieldsPredicate || "*";
    queryTemplate += ` FROM ${table} `;
    // Проверяем, задано ли условие ограничения по значениям
    queryTemplate += request.WherePredicate || "";
    // Проверяем, заданы ли настройки пропуска количества строк
    if(request.Skip != 0 || request.Take !=0)
    {
      //TODO: queryTemplate = HandleRequestPaging(request, queryTemplate);
    }
    else
    {
      queryTemplate += request.OrderBy || "";
    }
    // TODO: Check for injections
    return queryTemplate;
  }

//#endregion
}
