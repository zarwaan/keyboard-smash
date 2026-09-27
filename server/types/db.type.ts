import { Schema } from "mongoose";
import type { difficulty, playModes, Score } from "shared/types/shared.types"

export const COLLECTIONS = {
    users: "users",
    scores: "scores"
} as const