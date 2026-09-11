import { Schema } from "mongoose";
import type { difficulty, playModes, Score } from "shared/types/shared.types"

export interface DBUser {
    username: string;
    password: string;
    email?: string;
}

export interface DBScore {
    gameId: string;
    user: Schema.Types.ObjectId;
    score: Omit<Score,"lives">;
    difficulty: difficulty;
    playMode: playModes;
    accuracy: number;
    gameTime: number;
    timestamp: Date
}

export const COLLECTIONS = {
    users: "users",
    scores: "scores"
} as const