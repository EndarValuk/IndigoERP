import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript';

@Table({
  schema: "core",
  tableName: "object_properties"
})
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