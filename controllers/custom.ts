import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Timesheet } from "../models/timesheet";
import { LineItem } from "../models/lineitem";

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

        const timesheets = Timesheet.findAll({ where: { UserId: request.params.id }})
        response
            .status(200)
            .json({
                timesheets
            })
    } catch {
        response
            .status(500)
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

        const lineitems = LineItem.findAll({ where: { TimesheetId: request.params.id }})
        response
            .status(200)
            .json({
                lineitems
            })
    } catch {
        response
            .status(500)
    }
}

export { getTimeshsheetsForUser, getLineitemsForTimesheet }