// Loading external dependencies.
import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript';
import { IDefineOptions } from 'sequelize-typescript/lib/interfaces/IDefineOptions';
// Loading local dependencies.
import { ModuleType, ObjectType } from '@indy/types';
import { Mapper } from '@indy/datasource/mapper';
// Reading database schema mapping.
const decoration: IDefineOptions = Mapper(ModuleType.Core, ObjectType.Generic).$schema_definitions.properties;

@Table(decoration)
export default class ObjectProperty extends Model<ObjectProperty> {
  @PrimaryKey
  @Column(DataType.UUIDV4)
  guid: string;

  @Column(DataType.BIGINT)
  ref_object: number;

  @Column(DataType.INTEGER)
  ref_object_type: string;

  @Column(DataType.INTEGER)
  ref_type: string;

  @Column(DataType.TEXT)
  value: string;
}

export { ObjectProperty };