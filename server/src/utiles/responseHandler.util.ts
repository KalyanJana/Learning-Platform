import {Response} from 'express'

export class ResponseHandler {

    static sendSuccess(res: Response, data: any = {}, message: string = 'Success', statusCode: number = 200) {
        return res.status(statusCode).json({
            data,
            message,
            success: true,
        })
    }

    static sendError(res: Response, error: any = {}, message: string = 'Error', statusCode: number = 500) {
        return res.status(statusCode).json({
            error,
            message,
            success: false
        })
    }
}