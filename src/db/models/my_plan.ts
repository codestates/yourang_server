import {AllowNull, AutoIncrement, Column, CreatedAt, ForeignKey, HasMany, Model, NotEmpty, PrimaryKey, Table, UpdatedAt} from 'sequelize-typescript';
import Schedules from './plan_schedule';
import User from './user';
export interface Plan1{
    id?: number | null
    userId: number | null
    title: string
    createdAt: Date
    updatedAt: Date
}
@Table({
    tableName:"my_plan",
    timestamps:true
})
export default class My_Plan extends Model implements Plan1{
    @PrimaryKey
    @AutoIncrement
    @Column
    id?:number;

    @ForeignKey(()=>User)
    @AllowNull(false)
    @NotEmpty
    @Column
    userId!: number;

    @AllowNull(false)
    @NotEmpty
    @Column
    title!: string;

    @CreatedAt
    createdAt!: Date;

    @UpdatedAt
    updatedAt!: Date;

    @HasMany(()=>Schedules,{
        foreignKey:"planId"
    })
    schedules!: Schedules[];
}