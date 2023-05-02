import {
  Table,
  Column,
  Model, DataType, BelongsTo, HasMany
} from 'sequelize-typescript';
import UserModel from "@models/user.model";
import ServiceModel from "@models/service.model";
import ReviewModel from "@models/review.model";

@Table({ tableName: 'saloons' })
export default class SaloonModel extends Model {

  @Column
  name: string;

  @Column(DataType.TEXT)
  description: string;

  @HasMany(() => ServiceModel, 'saloonId')
  services: ServiceModel[];

  @HasMany(() => ReviewModel, 'saloonId')
  reviews: ReviewModel[];

  @BelongsTo(() => UserModel, {foreignKey: 'userId', onDelete: 'cascade'})
  user: UserModel;

}
