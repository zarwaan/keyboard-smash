import { IUserSessionDetails } from "./middleware.types";

declare module "express-session" {
    interface SessionData {
        userDetails?: IUserSessionDetails
    }
}