import { Table, Model, Column, PrimaryKey, Default, DataType } from "sequelize-typescript"

@Table({
    tableName: "user"
})
export class User extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({
        type: DataType.UUID
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
