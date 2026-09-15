import { DBUser } from "shared/types/shared.types";

export interface IUserSessionDetails extends Omit<DBUser,'password'> {
    userId: string
} 

export interface ResponseJsonBody {
    message: string,
    result: {
        content? : any,
        error? : any
    }
}