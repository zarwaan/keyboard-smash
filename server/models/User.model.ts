import mongoose, { Schema } from "mongoose";
import { DBUser } from "shared/types/shared.types";

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

