import { Table, Model, Column, DataType } from "sequelize-typescript"

@Table({
    tableName: "timesheet"
})
export class Timesheet extends Model {
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