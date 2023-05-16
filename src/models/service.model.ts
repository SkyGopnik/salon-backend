import {
  Table,
  Column,
  Model, DataType, BelongsTo, HasMany
} from 'sequelize-typescript';
import SaloonModel from "@models/saloon.model";
import RequestModel from "@models/request.model";

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

  @Column
  duration: number;

  @HasMany(() => RequestModel, 'serviceId')
  requests: RequestModel[];

  @BelongsTo(() => SaloonModel, {foreignKey: 'saloonId', onDelete: 'cascade'})
  saloon: SaloonModel;

}
