import express, { Request, Response } from "express"

const app = express().use(express.json())
const port = process.env.PORT || 3001

app.listen(port, () => console.log(`Listening on port ${port}`))

app.get("/", (req: Request, resp: Response) => {
    resp.send("OK")
})
