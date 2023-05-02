import {
  Table,
  Column,
  Model, DataType, BelongsTo, HasMany
} from 'sequelize-typescript';
import UserModel from "@models/user.model";
import ServiceModel from "@models/service.model";

@Table({ tableName: 'saloons' })
export default class SaloonModel extends Model {

  @Column
  name: string;

  @Column(DataType.TEXT)
  description: string;

  @HasMany(() => ServiceModel, 'saloonId')
  services: ServiceModel[];

  @BelongsTo(() => UserModel, {foreignKey: 'userId', onDelete: 'cascade'})
  user: UserModel;

}
