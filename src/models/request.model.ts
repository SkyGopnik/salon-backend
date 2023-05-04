import {
  Table,
  Column,
  Model,
  BelongsTo, DataType
} from 'sequelize-typescript';
import SaloonModel from "@models/saloon.model";
import ServiceModel from "@models/service.model";

@Table({ tableName: 'requests' })
export default class RequestModel extends Model {

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  phone: string;

  @Column(DataType.DATE)
  time: string;

  @BelongsTo(() => ServiceModel, {foreignKey: 'serviceId', onDelete: 'cascade'})
  service: ServiceModel;

  @BelongsTo(() => SaloonModel, {foreignKey: 'saloonId', onDelete: 'cascade'})
  saloon: SaloonModel;

}
