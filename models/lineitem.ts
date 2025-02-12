import { Table, Model, Column, PrimaryKey, Default, DataType } from "sequelize-typescript"

@Table({
    tableName: "lineitem"
})
export class LineItem extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({
        type: DataType.UUID
    })
    id!: string;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    date!: Date;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    minutes!: number;
}