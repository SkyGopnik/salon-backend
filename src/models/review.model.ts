import {
  Table,
  Column,
  Model, DataType, BelongsTo
} from 'sequelize-typescript';
import SaloonModel from "@models/saloon.model";

@Table({ tableName: 'reviews' })
export default class ReviewModel extends Model {

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column(DataType.FLOAT)
  rating: number;

  @Column(DataType.TEXT)
  description: string;

  @BelongsTo(() => SaloonModel, {foreignKey: 'saloonId', onDelete: 'cascade'})
  saloon: SaloonModel;

}
