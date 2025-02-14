import express, { Request, Response } from "express"
import { param, body } from "express-validator"
import { register, login, requireLoggedIn } from "./controllers/auth"
import UserAPI from "./controllers/user"
import TimesheetAPI from "./controllers/timesheet"
import LineItemAPI from "./controllers/lineitem"
import { getTimeshsheetsForUser, getLineitemsForTimesheet } from "./controllers/custom"
import { config as dotenvConfig } from "dotenv";

// Load Env, DB Connection
dotenvConfig()
import conn from "./db"

// CORS
import cors from "cors"
const corsOptions = {
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"]
}

// Handle JSON on PORT
const app = express().use(express.json()).use(cors(corsOptions))
const port = process.env.PORT || 3001

// Status
app.get("/", (req: Request, resp: Response) => {
    resp.send("OK")
})

// JWT Auth
app.post(
    "/register",
    body("username").isString().isLength({ min: 8 }),
    body("password").isString().isLength({ min: 8 }),
    register
)
app.post(
    "/login",
    body("username").isString().isLength({ min: 8 }),
    body("password").isString().isLength({ min: 8 }),
    login
)

// User REST
app.use("/user", requireLoggedIn, UserAPI)

// Timesheet REST
app.use("/timesheet", requireLoggedIn, TimesheetAPI)

// LineItem REST
app.use("/lineitem", requireLoggedIn, LineItemAPI)

// Special controllers
app.get(
    "/timesheets-for-user/:id",
    param("id").isUUID(),
    requireLoggedIn,
    getTimeshsheetsForUser
)

app.get(
    "/lineitems-for-timesheet/:id",
    param("id").isUUID(),
    requireLoggedIn,
    getLineitemsForTimesheet
)

async function start(): Promise<void> {
    try {
        await conn.sync()
        app.listen(port, () => `Listening on port ${port}...`)
    } catch (error) {
        console.error(error)
        process.exit(-1)
    }
}

void start()