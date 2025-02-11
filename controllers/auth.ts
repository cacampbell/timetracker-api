import { Request, Response } from "express"
import { hash, genSalt, compare } from "bcrypt"
import { sign } from "jsonwebtoken"
import { User } from "../models/user"

async function hashPass(password: string): Promise<string> {
    const salt = await genSalt(10)
    return hash(password, salt)
}

function generateAccessToken(message: object): string {
    return sign(message, process.env.JWT_SECRET_KEY!, { expiresIn: 10000 })
}

async function register(request: Request, response: Response): Promise<void> {
    try {
        const payload = request.body
        const username = payload.username
        const hashedPass = await hashPass(payload.password)
        const newUser = await User.create({
            username: username,
            hashedPassword: hashedPass
        })
        const accessToken = generateAccessToken({
            username: username,
            id: newUser.id
        })
        response
            .status(201)
            .json({
                user: newUser.toJSON(),
                token: accessToken
            })
    } catch {
        response
            .status(500)
            .json({
                error: "Internal error."
            })
    }
}

async function login(request: Request, response: Response): Promise<void> {
    try {
        const payload = request.body
        const username = payload.username
        const hashedPassword = await hashPass(payload.password)
        const user = await User.findOne({ where: { username: username }})
        if (user) {
            if (await compare(user.hashedPassword, hashedPassword)) {
                const accessToken = generateAccessToken({
                    username: username,
                    id: user.id
                })
                response
                    .status(200)
                    .json({
                        token: accessToken
                    })
            } else {
                // This could be a security vulnerability!
                response
                    .status(401)
                    .json({
                        error: "Incorrect password."
                    })
            }
        } else {
            response
                .status(404)
                .json({
                    error: "User not found."
                })
        }
    } catch {
        response
            .status(500)
            .json({
                error: "Internal error."
            })
    }
}

export { register, login }