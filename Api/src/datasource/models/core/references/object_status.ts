// Loading external dependencies.
import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { IDefineOptions } from 'sequelize-typescript/lib/interfaces/IDefineOptions';
// Loading local dependencies.
import { IReference } from '@indy/datasource/models/interfaces';
import { ModuleType, ObjectType } from '@indy/types';
import { Mapper } from '@indy/datasource/mapper';
// Reading database schema mapping.
const decoration: IDefineOptions = Mapper(ModuleType.Core, ObjectType.Generic).$schema_definitions.references.object_status;

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