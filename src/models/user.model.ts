import {
    Table,
    Column,
    Model, HasMany
} from 'sequelize-typescript';
import SaloonModel from "@models/saloon.model";

@Table({ tableName: 'users' })
export default class UserModel extends Model {

    @Column
    firstName: string;

    @Column
    lastName: string;

    @Column
    email: string;

    @Column
    password: string;

    @Column
    token: string;

    @HasMany(() => SaloonModel, 'userId')
    saloons: SaloonModel[];

}
