import {Model,AllowNull, AutoIncrement, Column, NotEmpty, PrimaryKey, Table, HasMany, UpdatedAt, CreatedAt} from 'sequelize-typescript'
import Bookmarked_place from './bookmarked_place';
import Myplan from './my_plan';
export interface User1{
    id?: number | null
    user_id: string
    password: string
    email: string
    phone: string
    createdAt: Date
    updatedAt: Date
}
@Table({
    tableName:'user',
    timestamps:true
})
export default class User extends Model implements User1{
    
    @AutoIncrement
    @PrimaryKey
    @Column
    id?: number;

    @AllowNull(false)
    @NotEmpty
    @Column    
    user_id!: string;

    @AllowNull(false)
    @NotEmpty
    @Column
    password!: string;

    @AllowNull(false)
    @NotEmpty
    @Column
    email!: string;

    @AllowNull(false)
    @NotEmpty
    @Column
    phone!: string;
    
    @CreatedAt    
    createdAt!: Date;
    
    @UpdatedAt
    updatedAt!: Date;

    @HasMany(()=>Myplan,{
        foreignKey:'userId'
    })
    plans!: Myplan[];

    @HasMany(()=>Bookmarked_place,{
        foreignKey:'userId'
    })
    bookmarked_place !: Bookmarked_place[];
}

