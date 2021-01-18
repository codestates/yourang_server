import {AllowNull, AutoIncrement, Column, HasMany, Model, NotEmpty, PrimaryKey, Table} from 'sequelize-typescript';
import Places from './place';

export interface Category1{
    id?:number|null
    category:string    
}
@Table({
    tableName:"category",
    timestamps:true
})
export default class Category extends Model implements Category1{
    @AutoIncrement
    @PrimaryKey
    @Column
    id?: number

    @AllowNull(false)
    @NotEmpty
    @Column
    category!:string

    @HasMany(()=>Places,{
        foreignKey:"category_Id"
    })
    places!: Places[];
}