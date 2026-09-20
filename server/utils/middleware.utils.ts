import { Response } from "express";
import { ResponseJsonBody } from "shared/types/shared.types";
// import { ResponseJsonBody } from "../types/middleware.types";

export const jsonResponse = (res: Response, status: number, jsonBody: Partial<ResponseJsonBody>) => {
    const fullJsonBody: ResponseJsonBody = {
        message: "",
        result: {
            error: {},
            content: {}
        },
        ...jsonBody
    }
    return res.status(status).json(fullJsonBody)
}