import {AllowNull, AutoIncrement, Column, CreatedAt, ForeignKey, Model, NotEmpty, PrimaryKey, Table, UpdatedAt} from 'sequelize-typescript';
import My_Plan from './my_plan';
import Places from './place';

export interface Schedule{
    id?: number|null
    planId:number
    placeId:number
    createdAt:Date
    updatedAt:Date
}
@Table({
    tableName: "plan_schedule",
    timestamps:true
})
export default class  Schedules extends Model implements Schedule{
    @PrimaryKey
    @AutoIncrement
    @Column
    id?: number;

    @ForeignKey(()=>My_Plan)
    @AllowNull(false)
    @NotEmpty
    @Column
    planId!: number;

    @ForeignKey(()=>Places)
    @AllowNull(false)
    @NotEmpty
    @Column
    placeId!: number;

    @CreatedAt
    createdAt!: Date

    @UpdatedAt
    updatedAt!: Date
}