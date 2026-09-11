import type { DBScore } from "../types/db.type";
import mongoose, { Schema } from "mongoose";

const requiredString = {
    type: String,
    required: true
}
const requiredNumber = {
    type: Number,
    required: true
}

const ScoreSchema = new Schema<DBScore>({
    gameId: {
        ...requiredString,
        unique: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    score: {
        type: {
            targetsHit: Number,
            targetsMissed: Number,
            bombsHit: Number,
        },
        required: true
    },
    difficulty: {
        ...requiredString
    },
    playMode: {
        ...requiredString
    },
    accuracy: {
        ...requiredNumber
    },
    gameTime: {
        ...requiredNumber
    }
},
{
    timestamps: true
});

export const ScoreModel = mongoose.model("Score", ScoreSchema)