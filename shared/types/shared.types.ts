// import type { PowerUpType } from "../../src/types/targets.type";
import type { Types } from "mongoose";

export type difficulty = "easy" | "medium" | "hard" | "impossible" | "incr"
export type playModes = "lives" | "infinite" 
type PowerUpType = "shield" | "life" | "fireAll"

export interface Score {
    targetsHit: number;
    targetsMissed: number;
    bombsHit: number;
    powerupsCollected: Record<PowerUpType,number>;
    lives: number;
}

export interface DBUser {
    username: string;
    password: string;
    email?: string;
}

export interface DBScore {
    gameId: string;
    user: Types.ObjectId;
    score: Omit<Score,"lives">;
    difficulty: difficulty;
    playMode: playModes;
    accuracy: number;
    gameTime: number;
}

export interface ResponseJsonBody<T> {
    message: string,
    result: {
        content? : T,
        error? : any
    }
}

export interface IUserSessionDetails extends Omit<DBUser,'password'> {
    userId: string
} 