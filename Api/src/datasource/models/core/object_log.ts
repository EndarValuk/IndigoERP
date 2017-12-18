// Loading external dependencies.
import { Table, Column, Model, DataType, PrimaryKey } from 'sequelize-typescript';

@Table({
  schema: "core",
  tableName: "object_logs"
})
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