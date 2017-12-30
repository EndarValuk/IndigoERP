// Loading external dependencies.
import { Table, DefaultScope, Column, Model, DataType, PrimaryKey, AutoIncrement, HasMany } from 'sequelize-typescript';
import { IDefineOptions } from 'sequelize-typescript/lib/interfaces/IDefineOptions';
// Loading local dependencies.
import { ModuleType, ObjectType } from '@indy/types';
import { SchemaMappingHandler } from '@indy/datasource/handlers';
import { ObjectProperty } from '../core';

// Reading database schema mapping.
const decoration: IDefineOptions = SchemaMappingHandler.GetObjectConfig(ModuleType.Anubis, ObjectType.User).$schema_definitions;

@Table(decoration)
@DefaultScope({
  attributes: [ 'id', 'ref_status', 'login', 'name', 'patronymic', 'surname', 'properties', 'lastchange_timestamp', 'create_timestamp' ],
  order: [
    ['id', 'ASC']
  ]
})
export default class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    field: "guid"
  })
  id: number;

  @Column(DataType.INTEGER)
  ref_status: number;

  @Column(DataType.STRING(50))
  login: string;

  @Column({
    type: DataType.STRING(255),
    field: "name"
  })
  name: string;

  @Column(DataType.TEXT)
  password: string;

  @Column({
    type: DataType.STRING(255),
    field: "patronymic"
  })
  patronymic: string;

  @Column({
    type: DataType.STRING(255),
    field: "surname"
  })
  surname: string;

  @Column(DataType.BIGINT)
  properties: number;

  @Column(DataType.DATE)
  lastchange_timestamp: Date;

  @Column({
    type: DataType.DATE,
    field: "create_timestamp"
  })
  create_timestamp: Date;

  @HasMany(() => ObjectProperty, "ref_object")
  object_properties: ObjectProperty[];
}

export { User };