import { NextFunction, Request, Response } from "express"
import { validationResult } from "express-validator"
import { hash, genSalt, compare } from "bcrypt"
import { JsonWebTokenError, sign, verify } from "jsonwebtoken"
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
        const errors = validationResult(request)
        if (!errors.isEmpty()) {
            response
                .status(400)
                .json({
                    errors: errors.array()
                })
            return;
        }

        const payload = request.body
        const username = payload.username
        const hashedPass = await hashPass(payload.password)

        // Check if this user already exists
        const user = await User.findOne({ where: { username }})
        if (user) {
            response
                .status(401)
                .json({
                    error: "Username already registered."
                })
            return;
        }

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
    } catch (error) {
        response
            .status(500)
    }
}

async function login(request: Request, response: Response): Promise<void> {
    try {
        const errors = validationResult(request)
        if (!errors.isEmpty()) {
            response
                .status(400)
                .json({
                    errors: errors.array()
                })
            return;
        }

        const payload = request.body
        const username = payload.username
        const password = payload.password

        const user = await User.findOne({ where: { username: username }})
        if (user) {
            if (await compare(password, user.hashedPassword)) {
                const accessToken = generateAccessToken({
                    username: username,
                    id: user.id
                })
                response
                    .status(200)
                    .json({
                        user: user.toJSON(),
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
                    error: "Not found."
                })
        }
    } catch {
        response
            .status(500)
    }
}

function requireLoggedIn(request: Request, response: Response, next: NextFunction): void {
    const token = request.headers["authorization"]
    if (token) {
        try {
            verify(token!, process.env.JWT_SECRET_KEY!)
            next()
        } catch (error) {
            if (error instanceof JsonWebTokenError) {
                response
                    .status(401)
                    .json({
                        error: "Invalid token."
                    })
            }
        }
    } else {
        response
            .status(401)
            .json({
                error: "Unauthorized."
            })
        return;
    }
}

export { register, login, requireLoggedIn }