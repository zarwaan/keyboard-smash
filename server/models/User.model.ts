import type { DBUser } from "../types/db.type";
import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema<DBUser>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String
    }
},
{
    timestamps: true
});

export const UserModel = mongoose.model('User',UserSchema)

