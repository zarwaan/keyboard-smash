import type {DBScore} from './shared.types';

export type ScoreBody = Omit<DBScore,'user'>

export interface IScoreDetails extends ScoreBody {
    user: string,
    createdAt : Date
}

export type IScoreWithoutUser = Omit<IScoreDetails,"user">;
export interface ILeaderBoardScore extends IScoreDetails {
    userDetails: {
        username: string,
    }
}