import { DBUser } from "shared/types/shared.types";

export interface IUserSessionDetails extends Omit<DBUser,'password'> {
    userId: string
} 