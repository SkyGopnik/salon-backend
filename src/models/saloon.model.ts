import {
  Table,
  Column,
  Model, DataType, BelongsTo
} from 'sequelize-typescript';
import UserModel from "@models/user.model";

@Table({ tableName: 'saloons' })
export default class SaloonModel extends Model {

  @Column
  name: string;

  @Column(DataType.TEXT)
  description: string;

  @BelongsTo(() => UserModel, {foreignKey: 'userId', onDelete: 'cascade'})
  user: UserModel;

}
