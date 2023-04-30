import {
    Table,
    Column,
    Model
} from 'sequelize-typescript';

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

}
