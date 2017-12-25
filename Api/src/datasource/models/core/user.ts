import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

import { ObjectProperty } from './object_property';
import { HasMany } from 'sequelize-typescript/lib/annotations/association/HasMany';

@Table({
  schema: 'core',
  tableName: 'users'
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

  @Column(DataType.STRING(255))
  name: string;

  @Column(DataType.TEXT)
  password: string;

  @Column(DataType.STRING(255))
  patronymic: string;

  @Column(DataType.STRING(255))
  surname: string;

  @Column(DataType.BIGINT)
  properties: number;

  @Column(DataType.DATE)
  lastchange_timestamp: Date;

  @Column(DataType.DATE)
  create_timestamp: Date;

  @HasMany(() => ObjectProperty, "ref_object")
  object_properties: ObjectProperty[];
}

export { User };