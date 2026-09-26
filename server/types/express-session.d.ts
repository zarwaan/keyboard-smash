import { IUserSessionDetails } from "shared/types/shared.types";

declare module "express-session" {
    interface SessionData {
        userDetails?: IUserSessionDetails
    }
}