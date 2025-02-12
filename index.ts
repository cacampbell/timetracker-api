import express, { Request, Response } from "express"
import conn from "./db"
import { register, login, requireLoggedIn } from "./controllers/auth"
import UserAPI from "./controllers/user"
import TimesheetAPI from "./controllers/timesheet"
import LineItemAPI from "./controllers/lineitem"

const app = express().use(express.json())
const port = process.env.PORT || 3001

// Status
app.get("/", (req: Request, resp: Response) => {
    resp.send("OK")
})

// JWT Auth
app.post("/register", register)
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