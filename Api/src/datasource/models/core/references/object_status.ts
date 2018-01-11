// Loading external dependencies.
import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { IDefineOptions } from 'sequelize-typescript/lib/interfaces/IDefineOptions';

// Loading local dependencies.
import { ModuleType, ObjectType } from '@indyecm/defs/types';

import { SchemaMappingHandler } from '@indyecm/api/datasource/handlers';
import { IReference } from '@indyecm/api/datasource/models/interfaces';

// Reading database schema mapping.
const decoration: IDefineOptions = SchemaMappingHandler.GetObjectConfig(ModuleType.Core, ObjectType.Generic).$schema_definitions.references.object_status;

@Table(decoration)
export default class Reference extends Model<Reference> implements IReference {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column
  name: string;

  @Column
  description: string;

  @Column(DataType.BIGINT)
  properties: number;
}

export { Reference };
