import express, { Request, Response } from "express"

const app = express();
const port = process.env.PORT || 3001

app.get("/", (req, resp) => {
    resp.send("OK")
})