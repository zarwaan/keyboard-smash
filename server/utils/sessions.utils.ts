import { Request } from "express";
import { HydratedDocument } from "mongoose";
import { DBUser, IUserSessionDetails } from "shared/types/shared.types";

export const setSession = (req: Request, user: HydratedDocument<DBUser> ) => {
    const userSessionDetails: IUserSessionDetails = {
        username: user.username,
        userId: user._id.toString(),
        email: user.email
    }
    req.session.userDetails = userSessionDetails;
}