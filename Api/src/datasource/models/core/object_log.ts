// Loading external dependencies.
import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript';
import { IDefineOptions } from 'sequelize-typescript/lib/interfaces/IDefineOptions';
// Loading local dependencies.
import { ModuleType, ObjectType } from '@indy/types';
import { Mapper } from '@indy/datasource/mapper';
// Reading database schema mapping.
const decoration: IDefineOptions = Mapper(ModuleType.Core, ObjectType.Generic).$schema_definitions.logs;

@Table(decoration)
export default class ObjectLog extends Model<ObjectLog> {
  @PrimaryKey
  @Column(DataType.UUIDV4)
  guid: string;

  @Column(DataType.BIGINT)
  ref_object: number;

  @Column(DataType.INTEGER)
  ref_object_type: string;

  @Column(DataType.INTEGER)
  ref_action: string;

  @Column(DataType.STRING(50))
  ref_invoker: string;

  @Column(DataType.TEXT)
  remark: string;

  @Column(DataType.DATE)
  create_timestamp: Date;
}

export { ObjectLog };