import {AllowNull, AutoIncrement, Column, CreatedAt, ForeignKey, HasMany, Model, NotEmpty, PrimaryKey, Table, UpdatedAt} from 'sequelize-typescript';
import Category from "./category";
import BookMarked_Place from "./bookmarked_place";
import Plan_Schedule from "./plan_schedule"
export interface Place{
    id?: number | null
    category_Id: number
    place_name: string
    address : string
    number : string
    explain : string
    photo : string
    lat : number
    lon : number
    createdAt : Date
    updatedAt : Date
}

@Table({
    tableName:'place',
    timestamps:true
})
export default class Places extends Model implements Place{

    @PrimaryKey
    @AutoIncrement
    @Column
    id?: number;

    @ForeignKey(()=>Category)
    @AllowNull(false)
    @NotEmpty
    @Column
    category_Id!:number;

    @AllowNull(false)
    @NotEmpty
    @Column
    place_name!:string;

    @AllowNull(false)
    @NotEmpty
    @Column
    address!:string;

    @AllowNull(false)
    @NotEmpty
    @Column
    number!:string;

    @AllowNull(false)
    @NotEmpty
    @Column
    explain!:string;

    @AllowNull(false)
    @NotEmpty
    @Column
    photo!:string;

    @AllowNull(false)
    @NotEmpty
    @Column
    lat!:number;

    @AllowNull(false)
    @NotEmpty
    @Column
    lon!:number;

    @CreatedAt
    createdAt!: Date

    @UpdatedAt
    updatedAt!: Date

    @HasMany(()=>BookMarked_Place,{
        foreignKey:"placeId"
    })
    bookmarked_place!: BookMarked_Place[];

    @HasMany(()=>Plan_Schedule,{
        foreignKey:"placeId"
    })
    plan_schedule!: Plan_Schedule[];
}