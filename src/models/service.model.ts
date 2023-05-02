import {
  Table,
  Column,
  Model, DataType, BelongsTo
} from 'sequelize-typescript';
import SaloonModel from "@models/saloon.model";

@Table({ tableName: 'services' })
export default class ServiceModel extends Model {

  @Column
  name: string;

  @Column
  subName: string;

  @Column(DataType.TEXT)
  description: string;

  @Column
  price: number;

  @BelongsTo(() => SaloonModel, {foreignKey: 'saloonId', onDelete: 'cascade'})
  saloon: SaloonModel;

}
