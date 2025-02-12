import { Sequelize } from "sequelize-typescript"
import { User } from "./models/user"
import { Timesheet } from "./models/timesheet"
import { LineItem } from "./models/lineitem"

const sequelize = new Sequelize({
    dialect: "postgres",
    host: process.env.DB_HOSTNAME || "localhost",
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "postgres",
    database: "sequelize",
    logging: false,
    models: [User, Timesheet, LineItem]
})

User.hasMany(Timesheet)
Timesheet.belongsTo(User)
Timesheet.hasMany(LineItem)
LineItem.belongsTo(Timesheet)

export default sequelize;