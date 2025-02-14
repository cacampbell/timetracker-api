import { Router, Request, Response } from "express"
import { body, param, validationResult } from "express-validator"
import { LineItem } from "../models/lineitem"

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

    const lineitem = await LineItem.create({
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
    const allitems = await LineItem.findAll()
    response
        .status(200)
        .json(allitems)
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

router.post(
    "/",
    body("date").isDate(),
    body("minutes").isNumeric(),
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
    body("date").isDate(),
    body("minutes").isNumeric(),
    save
)

router.delete(
    "/:id",
    param("id").isUUID(),
    remove
)

export default router;