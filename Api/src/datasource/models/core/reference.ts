import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({
  schema: "core",
  tableName: "reference_object_status"
})
export default class Reference extends Model<Reference> {
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