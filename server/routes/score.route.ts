import express from "express";
import type {IScoreDetails, ScoreBody} from 'shared/types/scores.types'
import { jsonResponse } from "../utils/middleware.utils";
import { ScoreModel } from "../models/Score.model";
import { HydratedDocument, Schema, Types } from "mongoose";
import { DBScore } from "shared/types/shared.types";
import { error } from "console";
import { scoreResponse } from "../utils/scores.utils";
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
        const newScore = await ScoreModel.create({
            ...scoreBody,
            user: new Types.ObjectId(userId)
        });
        return jsonResponse<IScoreDetails>(res,200,{
            message: "Added succesfully",
            result: {
                content: scoreResponse(newScore)
            }
        })
    }
    catch (e) {
        return jsonResponse(res, 500, {
            message: "Error adding score",
            result: {
                error: e
            }
        })
    }
});

scoreRouter.get('/user/:id', async (req, res) => {
    const {id: userId} = req.params;
    const userObjId = new Types.ObjectId(userId);

    try {
        const userScores = await ScoreModel.find({
            user: userObjId
        },{
            gameId: 1,
            gameTime: 1,
            score: 1,
            difficulty: 1,
            playMode: 1,
            accuracy: 1,
        });

        if(userScores){
            return jsonResponse<Omit<IScoreDetails,"user">[]>(res, 200, {
                message: "Found scores",
                result: {
                    content: userScores
                }
            })
        }
        else{
            return jsonResponse(res, 404, {
                message: "Could not find scores"
            })
        }
    }
    catch (e) {
        return jsonResponse(res, 500, {
            message: "Error finding scores",
            result: {
                error: e
            }
        })
    }
})

scoreRouter.get('/:id', async (req, res) => {
    const {id: scoreId} = req.params;
    try{
        const scoreRow = await ScoreModel.findOne({
            gameId: scoreId
        });
        if(scoreRow){
            return jsonResponse<IScoreDetails>(res,200,{
                message: "Found score",
                result: {
                    content: scoreResponse(scoreRow)
                }
            })
        }
        else
            return jsonResponse(res, 404, {
                message: "Score not found",
            })
    }
    catch (e) {
        return jsonResponse(res, 500, {
            message: "Error retreiving score",
            result: {
                content : {
                    error: e
                }
            }
        })
    }
});

export default scoreRouter;