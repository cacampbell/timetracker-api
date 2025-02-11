import { Table, Model, Column, DataType } from "sequelize-typescript"

@Table({
    tableName: "lineitem"
})
export class LineItem extends Model {
    @Column({
        type: DataType.UUID,
        primaryKey: true
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