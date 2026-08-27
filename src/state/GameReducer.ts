export const POSSIBLE_TARGET_TYPES = [
    "target",
    "bomb",
] as const

export type TargetType = (typeof POSSIBLE_TARGET_TYPES)[number]

export interface Target {
    key: string;
    expiresAt: number;
    // isBomb: boolean;
    type: TargetType;

}

export interface HitEvent {
    id: string;
    key: string;
    type: TargetType
    expiresAt: number;
}

export interface Score {
    targetsHit: number;
    targetsMissed: number;
    bombsHit: number;
    lives: number;
}

export type GameEvent = "HIT_EVENT" | "MISS_EVENT" | "BOMB_EVENT" 
// | "SHIELD_EVENT" | "EXTRA_LIFE_EVENT"

export interface GameReducerState {
    gameId: number;
    targetKeys: Target[];
    hitEvents: HitEvent[];
    gameEventSequence: GameEvent[]; 
    score: Score;
    gameState: "ongoing" | "stopped";
    isPaused: boolean;
    isGameOver: boolean;
}

const INITIAL_SCORE: Score = { targetsHit: 0, targetsMissed: 0, bombsHit: 0, lives: 7 };

export const initialGameState: GameReducerState = {
    gameId: 0,
    targetKeys: [],
    hitEvents: [],
    gameEventSequence: [],
    score: INITIAL_SCORE,
    gameState: "stopped",
    isPaused: false,
    isGameOver: false,
};

export type GameAction =
    | { type: "START_GAME" }
    | { type: "STOP_GAME" }
    | { type: "PAUSE_GAME" }
    | { type: "RESUME_GAME"; pausedDuration: number }
    | { type: "ADD_TARGET"; target: Target }
    | { type: "HIT_TARGET"; key: string; now: number; infiniteLives: boolean }
    | { type: "EXPIRE_TARGETS"; now: number; infiniteLives: boolean }
    | { type: "CLEANUP_HIT_EVENTS"; now: number };

function applyLivesDelta(score: Score, delta: number, infiniteLives: boolean): Score {
    return { ...score, lives: infiniteLives ? score.lives : score.lives - delta };
}

export function gameReducer(state: GameReducerState, action: GameAction): GameReducerState {
    switch (action.type) {
        case "START_GAME":
            return { ...initialGameState, gameId: state.gameId + 1, gameState: "ongoing" };

        case "STOP_GAME":
            return { ...state, gameState: "stopped", isPaused: false, targetKeys: [], score: INITIAL_SCORE };

        case "PAUSE_GAME":
            return state.gameState === "ongoing" ? { ...state, isPaused: true } : state;

        case "RESUME_GAME":
            return {
                ...state,
                isPaused: false,
                targetKeys: state.targetKeys.map(t => ({
                    ...t,
                    expiresAt: t.expiresAt + action.pausedDuration,
                })),
            };

        case "ADD_TARGET": {
            const occupied = new Set(state.targetKeys.map(t => t.key));
            if (occupied.has(action.target.key)) return state;
            return { ...state, targetKeys: [...state.targetKeys, action.target] };
        }

        case "HIT_TARGET": {
            const target = state.targetKeys.find(t => t.key.toLowerCase() === action.key.toLowerCase());
            if (!target) return state;

            const hitEvent: HitEvent = {
                id: crypto.randomUUID(),
                key: target.key,
                type: target.type,
                expiresAt: action.now + 500,
            };

            const score = target.type === "bomb"
                ? applyLivesDelta({ ...state.score, bombsHit: state.score.bombsHit + 1 }, 2, action.infiniteLives)
                : { ...state.score, targetsHit: state.score.targetsHit + 1 };

            const gameEvent : GameEvent = (() : GameEvent => {
                switch(target.type)
                {
                    case 'bomb': return "BOMB_EVENT";
                    case 'target': return "HIT_EVENT";
                }
            })();

            return {
                ...state,
                targetKeys: state.targetKeys.filter(t => t.key !== target.key),
                hitEvents: [...state.hitEvents, hitEvent],
                gameEventSequence: [...state.gameEventSequence, gameEvent],
                score,
                isGameOver: score.lives <= 0,
            };
        }

        case "EXPIRE_TARGETS": {
            const expired = state.targetKeys.filter(t => t.expiresAt <= action.now);
            if (expired.length === 0) return state;

            const missedCount = expired.filter(t => t.type==="target").length;
            const score =
                missedCount > 0
                    ? applyLivesDelta(
                          { ...state.score, targetsMissed: state.score.targetsMissed + missedCount },
                          missedCount,
                          action.infiniteLives
                      )
                    : state.score;

            const missEvents : GameEvent[] = Array<GameEvent>(missedCount).fill("MISS_EVENT");

            return {
                ...state,
                targetKeys: state.targetKeys.filter(t => t.expiresAt > action.now),
                score,
                gameEventSequence: [...state.gameEventSequence, ...missEvents],
                isGameOver: score.lives <= 0,
            };
        }

        case "CLEANUP_HIT_EVENTS":
            return { ...state, hitEvents: state.hitEvents.filter(e => e.expiresAt > action.now) };

        default:
            return state;
    }
}