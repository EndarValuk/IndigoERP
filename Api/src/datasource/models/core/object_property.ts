// Loading external dependencies.
import { Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { IDefineOptions } from 'sequelize-typescript/lib/interfaces/IDefineOptions';

// Loading local dependencies.
import { ModuleType, ObjectType } from '@indyecm/defs/types';

import { SchemaMappingHandler } from '@indyecm/api/datasource/handlers';

// Reading database schema mapping.
const decoration: IDefineOptions = SchemaMappingHandler.GetObjectConfig(ModuleType.Core, ObjectType.Generic).$schema_definitions.properties;

@Table(decoration)
export default class ObjectProperty extends Model<ObjectProperty> {
  @PrimaryKey
  @Column(DataType.UUIDV4)
  guid: string;

  @Column(DataType.BIGINT)
  ref_object: number;

  @Column(DataType.INTEGER)
  ref_objecttype: string;

  @Column(DataType.INTEGER)
  ref_type: string;

  @Column(DataType.TEXT)
  value: string;
}

export { ObjectProperty };
