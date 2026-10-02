import { Response } from "express";
import mongoose from "mongoose";
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

export const isStrictValidObjectId = (id: string) => {
    return mongoose.Types.ObjectId.isValid(id) && new mongoose.Types.ObjectId(id).toString() === id
}

export const serverError = (res: Response, e: any) => {
    const errorBody : ResponseJsonBody<undefined> = {
        message: "Server Error",
        result: {
            error: e
        }
    }
    return res.status(500).json(errorBody)
}