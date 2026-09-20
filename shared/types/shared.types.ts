export type difficulty = "easy" | "medium" | "hard" | "impossible" | "incr"
export type playModes = "lives" | "infinite" 

export interface Score {
    targetsHit: number;
    targetsMissed: number;
    bombsHit: number;
    lives: number;
}

export interface DBUser {
    username: string;
    password: string;
    email?: string;
}

export interface ResponseJsonBody {
    message: string,
    result: {
        content? : any,
        error? : any
    }
}