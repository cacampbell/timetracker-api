import express, { Request, Response } from "express"
import { register, login, requireLoggedIn } from "./controllers/auth"
import UserAPI from "./controllers/user"
import TimesheetAPI from "./controllers/timesheet"
import LineItemAPI from "./controllers/lineitem"
import { config as dotenvConfig } from "dotenv";

// Load Env, DB Connection
dotenvConfig()
import conn from "./db"

// Handle JSON on PORT
const app = express().use(express.json())
const port = process.env.PORT || 3001

// Status
app.get("/", (req: Request, resp: Response) => {
    resp.send("OK")
})

// JWT Auth
app.post(
    "/register", 
    register
)
app.post("/login", login)

// User REST
app.use("/user", UserAPI, [requireLoggedIn])

// Timesheet REST
app.use("/timesheet", TimesheetAPI, [requireLoggedIn])

// LineItem REST
app.use("/lineitem", LineItemAPI, [requireLoggedIn])

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