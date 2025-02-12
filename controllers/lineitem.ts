import { Router, Request, Response } from "express"
import { body, param, validationResult } from "express-validator"
import { LineItem } from "../models/lineitem"

const router = Router()

async function create(request: Request, response: Response): Promise<void> {
    body("date").isDate()
    body("minutes").isNumeric()
    
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        response
            .status(400)
            .json({
                errors: errors.array()
            })
    }

    const lineitem = await LineItem.create()
    await lineitem.update({
        ...request.body
    })

    if (lineitem) {
        response
            .status(200)
            .json(lineitem.toJSON())
    } else {
        response
            .status(500)
            .json({
                error: "Internal error."
            })
    }
}

async function getAll(request: Request, response: Response): Promise<void> {
    const allSheets = await LineItem.findAll()
    response
        .status(200)
        .json(allSheets)
}

async function getById(request: Request, response: Response): Promise<void> {
    param("id").isUUID()
    
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        response
            .status(400)
            .json({
                errors: errors.array()
            })
    }

    const id = request.params.id
    const lineitem = await LineItem.findOne({ where: { id }})
    
    if (lineitem) {
        response
            .status(200)
            .json(lineitem.toJSON())
    } else {
        response
            .status(404)
            .json({
                error: "Not found."
            })
    }
}

async function save(request: Request, response: Response): Promise<void> {
    param("id").isUUID()
    body("date").isDate()
    body("minutes").isNumeric()
    
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        response
            .status(400)
            .json({
                errors: errors.array()
            })
    }
    
    const id = request.params.id
    const lineitem = await LineItem.findOne({ where: { id }})
    
    if (lineitem) {
        await lineitem.update({
            ...request.body
        })
        response
            .status(200)
            .json(lineitem)
    } else {
        response
            .status(404)
            .json("Not found.")
    }
}

async function remove(request: Request, response: Response): Promise<void> {
    param("id").isUUID()
    
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        response
            .status(400)
            .json({
                errors: errors.array()
            })
    }
    
    const id = request.params.id
    const lineitem = await LineItem.findOne({ where: { id }})
    
    if (lineitem) {
        await LineItem.destroy({ where: { id }})
        response
            .status(204)
            .json(lineitem)
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