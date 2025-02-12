import { Router, Request, Response } from "express"
import { body, param, validationResult } from "express-validator"
import { Timesheet } from "../models/timesheet"

const router = Router()

async function create(request: Request, response: Response): Promise<void> {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        response
            .status(400)
            .json({
                errors: errors.array()
            })
        return;
    }
    
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
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        response
            .status(400)
            .json({
                errors: errors.array()
            })
        return;
    }

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
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        response
            .status(400)
            .json({
                errors: errors.array()
            })
        return;
    }
    
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
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        response
            .status(400)
            .json({
                errors: errors.array()
            })
        return;
    }

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

router.post(
    "/",
    body("description").isString(),
    body("rate").isNumeric(),
    body("totalTime").isNumeric(),
    body("totalCost").isNumeric(),
    create
)

router.get(
    "/", 
    getAll
)

router.get(
    "/:id",
    param("id").isUUID(),
    getById
)

router.patch(
    "/:id",
    param("id").isUUID(),
    body("description").isString(),
    body("rate").isNumeric(),
    body("totalTime").isNumeric(),
    body("totalCost").isNumeric(),
    save
)

router.delete(
    "/:id",
    param("id").isUUID(),
    remove
)

export default router;