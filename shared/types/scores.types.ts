import type {DBScore} from './shared.types';

export type ScoreBody = Omit<DBScore,'user'>

export interface IScoreDetails extends ScoreBody {
    user: string
}