import { Table, Model, Column, DataType } from 'sequelize-typescript';

@Table({
    timestamps: true,
    tableName: 'user',
})
export class User extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password!: string;
}
