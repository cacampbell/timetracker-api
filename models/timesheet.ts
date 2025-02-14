import { Table, Model, Column, PrimaryKey, Default, DataType } from "sequelize-typescript"

@Table({
    tableName: "timesheet"
})
export class Timesheet extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({
        type: DataType.UUID
    })
    id!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    description!: string;

    @Column({
        type: DataType.DECIMAL,
        allowNull: false
    })
    rate!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    totalTime!: number;

    @Column({
        type: DataType.DECIMAL,
        allowNull: false
    })
    totalCost!: number;
}