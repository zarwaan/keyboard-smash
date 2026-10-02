import express from "express";
import type {IScoreDetails, ScoreBody, IScoreWithoutUser, ILeaderBoardScore} from 'shared/types/scores.types'
import { isStrictValidObjectId, jsonResponse, serverError } from "../utils/middleware.utils";
import { ScoreModel } from "../models/Score.model";
import { HydratedDocument, Schema, Types } from "mongoose";
import type { DBScore } from "shared/types/shared.types";
import { error } from "console";
import { ScoreFields } from "../utils/scores.utils";
// import type { IScoreWithoutUser } from "shared/types/scores.types";

const scoreRouter = express.Router();

scoreRouter.get('/health', (_,res) => {
    res.send("Scores alive")
});

scoreRouter.post('/', async (req, res) => {
    const scoreBody : ScoreBody = req.body as ScoreBody;

    if(!req.session.userDetails){
        return jsonResponse(res, 401, {
            message: "No user found!",
        })
    }

    const userId = req.session.userDetails.userId;

    try{
        const newScore = (await ScoreModel.create({
            ...scoreBody,
            user: new Types.ObjectId(userId)
        })).toObject<IScoreDetails>();

        return jsonResponse<IScoreDetails>(res,200,{
            message: "Added succesfully",
            result: {
                content: newScore
            }
        })
    }
    catch (e) {
        return serverError(res, e)
    }
});

scoreRouter.get('/user/{:id}', async (req, res) => {
    const userId = req.params.id ?? req.session.userDetails?.userId;
    console.log("User id " + userId)

    if(!userId) {
        return jsonResponse(res, 401, {
            message: "Authentication is required - userId could not be inferred"
        })
    }

    if(!isStrictValidObjectId(userId))
        return jsonResponse(res, 401, {
            message: "Invalid userId"
        })

    const userObjId = new Types.ObjectId(userId);

    try {
        const userScores = await ScoreModel.find({
            user: userObjId
        })
        .select("-user -updatedAt")
        .lean<IScoreWithoutUser[]>();

        return jsonResponse<IScoreWithoutUser[]>(res, 200, {
            message: "Found scores",
            result: {
                content: userScores
            }
        })
    }
    catch (e) {
        return serverError(res, e)
    }
})

scoreRouter.get('/leaderboard', async (req, res) => {
    const sortKeyQuery : string = req.query.sortKey as string ?? "accuracy"
    const sortOrder : string = req.query.sortOrder as string ?? "desc"

    const sortKey = 
    (["accuracy", "gameTime"].includes(sortKeyQuery)) ? sortKeyQuery :
    sortKeyQuery === "hits" ? "score.targetsHit" :
    null
    
    if(!sortKey)
        return jsonResponse(res, 400, {
            message: "Invalid sort key provided"
        })
    
    if(!["asc","desc"].includes(sortOrder))
        return jsonResponse(res, 400, {
            message: "Invalid sort order provided"
        })

    try {
        const leaderboardScores = await ScoreModel
        .aggregate([
            {
                "$lookup": {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "userDetails",
                }
            },
            {
                "$project": {
                    "userDetails.password": 0,
                    "userDetails.createdAt": 0,
                    "userDetails.updatedAt": 0,
                    "userDetails.email": 0
                }
            },
            {
                "$unwind": "$userDetails"
            }
        ])
        .sort({
            [sortKey] : (sortOrder === "asc" ? 1 : -1),
            createdAt : (sortOrder === "asc" ? 1 : -1)
        })

        return jsonResponse<ILeaderBoardScore[]>(res, 200, {
            message: "Found leaderboard",
            result: {
                content: leaderboardScores
            }
        })
    }
    catch (e){
        return serverError(res, e)
    }
})

scoreRouter.get('/:id', async (req, res) => {
    const {id: scoreId} = req.params;
    try{
        const scoreRow = await ScoreModel.findOne({
            gameId: scoreId
        })
        .lean<IScoreDetails>();

        if(scoreRow){
            return jsonResponse<IScoreDetails>(res,200,{
                message: "Found score",
                result: {
                    content: {
                        ...scoreRow,
                        user: scoreRow.user.toString()
                    }
                }
            })
        }
        else
            return jsonResponse(res, 404, {
                message: "Score not found",
            })
    }
    catch (e) {
        return serverError(res, e)
    }
});

export default scoreRouter;