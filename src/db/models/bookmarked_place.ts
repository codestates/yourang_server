import {AllowNull, AutoIncrement, Column, CreatedAt, ForeignKey, Model, NotEmpty, PrimaryKey, Table, UpdatedAt} from 'sequelize-typescript';
import Places from './place';
import User from './user';
export interface Bookmarked {
    id?: number | null
    userId: number | null
    placeId: number | null
    createdAt: Date
    updatedAt: Date
}
@Table({
    tableName:"bookmarked_place",
    timestamps:true
})
export default class Bookmarked_place extends Model implements Bookmarked{
    
    @PrimaryKey
    @AutoIncrement
    @Column
    id?: number;

    @ForeignKey(()=>User)
    @AllowNull(false)
    @NotEmpty
    @Column
    userId!:number;

    @ForeignKey(()=>Places)
    @AllowNull(false)
    @NotEmpty
    @Column
    placeId!:number;

    @CreatedAt
    createdAt!:Date;

    @UpdatedAt
    updatedAt!:Date;
}