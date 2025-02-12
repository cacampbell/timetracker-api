import { Router, Request, Response } from "express"
import { Timesheet } from "../models/timesheet"

const router = Router()

async function create(request: Request, response: Response): Promise<void> {
    const timesheet = await Timesheet.create()
    await timesheet.update({
        ...request.body
    })
    if (timesheet) {
        response
            .status(200)
            .json(timesheet.toJSON())
    } else {
        response
            .status(500)
            .json({
                error: "Internal error."
            })
    }
}

async function getAll(request: Request, response: Response): Promise<void> {
    const allSheets = await Timesheet.findAll()
    response
        .status(200)
        .json(allSheets)
}

async function getById(request: Request, response: Response): Promise<void> {
    const id = request.params.id
    const timesheet = await Timesheet.findOne({ where: { id }})
    if (timesheet) {
        response
            .status(200)
            .json(timesheet.toJSON())
    } else {
        response
            .status(404)
            .json({
                error: "Not found."
            })
    }
}

async function save(request: Request, response: Response): Promise<void> {
    const id = request.params.id
    const timesheet = await Timesheet.findOne({ where: { id }})
    if (timesheet) {
        await timesheet.update({
            ...request.body
        })
        response
            .status(200)
            .json(timesheet)
    } else {
        response
            .status(404)
            .json("Not found.")
    }
}

async function remove(request: Request, response: Response): Promise<void> {
    const id = request.params.id
    const timesheet = await Timesheet.findOne({ where: { id }})
    if (timesheet) {
        await Timesheet.destroy({ where: { id }})
        response
            .status(204)
            .json(timesheet)
    } else {
        response
            .status(404)
            .json({
                error: "Not found."
            })
    }
}

router.post("/", create)
router.get("/", getAll)
router.get("/:id", getById)
router.patch("/:id", save)
router.delete("/:id", remove)

export default router;