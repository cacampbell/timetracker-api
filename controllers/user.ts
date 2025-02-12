import { Router, Request, Response } from "express"
import { User } from "../models/user"

const router = Router()

async function getAll(request: Request, response: Response): Promise<void> {
    const allUsers = await User.findAll()
    response
        .status(200)
        .json(allUsers)
}

async function getById(request: Request, response: Response): Promise<void> {
    const id = request.params.id
    const user = await User.findOne({ where: { id }})
    if (user) {
        response
            .status(200)
            .json(user.toJSON())
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
    const user = await User.findOne({ where: { id }})
    if (user) {
        await user.update({
            ...request.body
        })
        response
            .status(200)
            .json(user)
    } else {
        response
            .status(404)
            .json("Not found.")
    }
}

async function remove(request: Request, response: Response): Promise<void> {
    const id = request.params.id
    const user = await User.findOne({ where: { id }})
    if (user) {
        await User.destroy({ where: { id }})
        response
            .status(204)
            .json(user)
    } else {
        response
            .status(404)
            .json({
                error: "Not found."
            })
    }
}

router.get("/", getAll)
router.get("/:id", getById)
router.patch("/:id", save)
router.delete("/:id", remove)

export default router;