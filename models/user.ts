import { Table, Model, Column, DataType } from "sequelize-typescript"

@Table({
    tableName: "user"
})
export class User extends Model {
    @Column({
        type: DataType.UUID,
        primaryKey: true
    })
    id!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    username!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    hashedPassword!: string;
}
