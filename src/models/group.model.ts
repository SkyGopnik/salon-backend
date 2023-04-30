import {
  Table,
  Column,
  Model,
  BelongsTo,
  Default,
  HasOne, PrimaryKey, AutoIncrement
} from 'sequelize-typescript';

@Table({tableName: 'Group'})
export default class GroupModel extends Model {

  @Column
  groupId: string;

}
