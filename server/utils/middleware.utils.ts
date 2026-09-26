import { Response } from "express";
import { ResponseJsonBody } from "shared/types/shared.types";
// import { ResponseJsonBody } from "../types/middleware.types";

export const jsonResponse = <T>(res: Response, status: number, jsonBody: Partial<ResponseJsonBody<T>>) => {
    const fullJsonBody: ResponseJsonBody<T> = {
        message: "",
        result: {
            error: {},
            content: {} as T
        },
        ...jsonBody
    }
    return res.status(status).json(fullJsonBody)
}