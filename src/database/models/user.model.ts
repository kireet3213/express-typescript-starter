import {
    Table,
    Model,
    Column,
    DataType,
    PrimaryKey,
    AutoIncrement,
    Unique,
} from 'sequelize-typescript';

@Table({
    timestamps: true,
    tableName: 'user',
})
export class User extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.BIGINT,
        allowNull: false,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Unique
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;
}
