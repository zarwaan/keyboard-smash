import mongoose, { Schema } from "mongoose";
import { DBScore } from "shared/types/shared.types";

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
            powerupsCollected: {
                type: Map,
                of: Number,
                default: {life: 0, shield:0, fireAll:0}
            }
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