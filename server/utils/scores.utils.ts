import { HydratedDocument } from "mongoose";
import { IScoreDetails } from "shared/types/scores.types";
import { DBScore } from "shared/types/shared.types";

// export const scoreResponse = (scoreArg: HydratedDocument<DBScore>) : IScoreDetails => {
//     const {
//         gameId, difficulty, playMode, score, accuracy, gameTime
//     }
//     = scoreArg

//     return {
//         gameId, score, difficulty, playMode, accuracy, gameTime,
//         user: scoreArg.user.toString()
//     }
// }

export const ScoreFields = {
                        gameId: 1,
                        gameTime: 1,
                        score: 1,
                        difficulty: 1,
                        playMode: 1,
                        accuracy: 1,
                        createdAt : 1
                    }