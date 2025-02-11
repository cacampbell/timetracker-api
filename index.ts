import express, { Request, Response } from "express"
import conn from "./db"

const app = express().use(express.json())
const port = process.env.PORT || 3001

app.get("/", (req: Request, resp: Response) => {
    resp.send("OK")
})

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