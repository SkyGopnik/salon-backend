import {
  Table,
  Column,
  Model,
  BelongsTo
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

  @BelongsTo(() => ServiceModel, {foreignKey: 'serviceId', onDelete: 'cascade'})
  service: ServiceModel;

  @BelongsTo(() => SaloonModel, {foreignKey: 'saloonId', onDelete: 'cascade'})
  saloon: SaloonModel;

}
