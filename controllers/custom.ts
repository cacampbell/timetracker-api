import { Request, Response } from "express";
import { validationResult } from "express-validator";

async function getTimeshsheetsForUser(request: Request, response: Response): Promise<void> {
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

        
    } catch {

    }
}

async function getLineitemsForTimesheet(request: Request, response: Response): Promise<void> {
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


    } catch {

    }
}