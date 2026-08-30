export const POSSIBLE_TARGET_TYPES = [
    "target",
    "bomb",
    "shield",
    "life",
    // "fire-all"
] as const

export const NON_POWERUP_TYPES = [
    "target",
    "bomb"
] as const

export type TargetType = (typeof POSSIBLE_TARGET_TYPES)[number]
export type PowerUpType = Exclude<TargetType, (typeof NON_POWERUP_TYPES)[number]>

export interface Target {
    key: string;
    expiresAt: number;
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

export interface PowerUpProperties {
    active: boolean, 
    expiresAt: number | null
}

export type GameEvent = "HIT_EVENT" | "MISS_EVENT" | "BOMB_EVENT" | "SHIELD_EVENT" | "EXTRA_LIFE_EVENT"

export interface GameReducerState {
    gameId: number;
    targetKeys: Target[];
    hitEvents: HitEvent[];
    gameEventSequence: GameEvent[]; 
    score: Score;
    gameState: "ongoing" | "stopped";
    isPaused: boolean;
    isGameOver: boolean;
    powerUps: Record<PowerUpType,PowerUpProperties>
}

const INITIAL_SCORE: Score = { targetsHit: 0, targetsMissed: 0, bombsHit: 0, lives: 7 };
const POWERUP_ACTIVE_FOR = 10000;

export const initialGameState: GameReducerState = {
    gameId: 0,
    targetKeys: [],
    hitEvents: [],
    gameEventSequence: [],
    score: INITIAL_SCORE,
    gameState: "stopped",
    isPaused: false,
    isGameOver: false,
    powerUps: {
        shield: {
            active: false,
            expiresAt : null
        },
        life: {
            active: false,
            expiresAt: null
        }
    }
};

export type GameAction =
    | { type: "START_GAME" }
    | { type: "STOP_GAME" }
    | { type: "PAUSE_GAME" }
    | { type: "RESUME_GAME"; pausedDuration: number }
    | { type: "ADD_TARGET"; target: Target }
    | { type: "HIT_TARGET"; key: string; now: number; infiniteLives: boolean }
    | { type: "EXPIRE_TARGETS"; now: number; infiniteLives: boolean }
    | { type: "CLEANUP_HIT_EVENTS"; now: number }
    | { type: "DEACTIVATE_POWERUPS"; now: number}

function applyLivesDelta(score: Score, delta: number, infiniteLives: boolean): Score {
    return { ...score, lives: infiniteLives ? score.lives : score.lives + delta };
}

function isPowerUp(t: TargetType){
    return !(NON_POWERUP_TYPES.includes(t as never))
}

function activatePowerUp(prevPowerUps: GameReducerState['powerUps'], powerUpName: PowerUpType, now: number) : GameReducerState['powerUps'] {
    if(powerUpName==="life") return prevPowerUps;

    const powerUps = { ...prevPowerUps }

    const remaining = Math.max(0, (powerUps[powerUpName].expiresAt ?? now) - now);

    powerUps[powerUpName] = {
        active: true,
        expiresAt: now + remaining + POWERUP_ACTIVE_FOR
    }
    
    return powerUps
}

export function gameReducer(state: GameReducerState, action: GameAction): GameReducerState {
    switch (action.type) {
        case "START_GAME":
            return { ...initialGameState, gameId: state.gameId + 1, gameState: "ongoing" };

        case "STOP_GAME":
            return { ...state, gameState: "stopped", isPaused: false, targetKeys: [], score: INITIAL_SCORE, powerUps: initialGameState['powerUps'] };

        case "PAUSE_GAME":
            return state.gameState === "ongoing" ? { ...state, isPaused: true } : state;

        case "RESUME_GAME":
            const powerUps = { ...state.powerUps };
            (Object.entries(state.powerUps) as [PowerUpType, PowerUpProperties][])
                .forEach(([k,v]) => {
                    if(v.expiresAt !== null){
                        powerUps[k] = {
                            ...v,
                            expiresAt: v.expiresAt + action.pausedDuration
                        }
                    }
                })

            return {
                ...state,
                isPaused: false,
                targetKeys: state.targetKeys.map(t => ({
                    ...t,
                    expiresAt: t.expiresAt + action.pausedDuration,
                })),
                powerUps
            };

        case "ADD_TARGET": {
            const occupied = new Set(state.targetKeys.map(t => t.key));
            if (occupied.has(action.target.key)) return state;
            return { ...state, targetKeys: [...state.targetKeys, action.target] };
        }

        case "HIT_TARGET": {
            const target = state.targetKeys.find(t => t.key.toLowerCase() === action.key.toLowerCase());
            const shieldUp = state.powerUps.shield.active;
            if (!target) return state;

            const hitEvent: HitEvent = {
                id: crypto.randomUUID(),
                key: target.key,
                type: target.type,
                expiresAt: action.now + 500,
            };

            const score = 
                target.type === "bomb" && !shieldUp ?
                    applyLivesDelta({ ...state.score, bombsHit: state.score.bombsHit + 1 }, -2, action.infiniteLives)
                : target.type === "bomb" && shieldUp ?
                    { ...state.score }
                : target.type === "life" && state.score.lives < 7 ?
                    applyLivesDelta({...state.score}, 1 ,action.infiniteLives)
                : { ...state.score, targetsHit: state.score.targetsHit + 1 };

            const gameEvent : GameEvent | undefined = (() : GameEvent | undefined => {
                switch(target.type)
                {
                    case 'bomb': if(!shieldUp) return "BOMB_EVENT"; break;
                    case 'target': return "HIT_EVENT";
                    case 'life': return "EXTRA_LIFE_EVENT";
                    case 'shield': return "SHIELD_EVENT";
                }
            })();

            let powerUps = { ...state.powerUps }

            if(isPowerUp(target.type)) 
                powerUps = activatePowerUp(state['powerUps'], target.type as never, action.now);

            return {
                ...state,
                powerUps,
                targetKeys: state.targetKeys.filter(t => t.key !== target.key),
                hitEvents: [...state.hitEvents, hitEvent],
                gameEventSequence: gameEvent ? [...state.gameEventSequence, gameEvent] : [...state.gameEventSequence],
                score,
                isGameOver: score.lives <= 0,
            };
        }

        case "EXPIRE_TARGETS": {
            if(state.powerUps.shield.active)
                return {
                    ...state,
                    targetKeys: state.targetKeys.filter(t => t.expiresAt > action.now)
                }
        
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

        case "DEACTIVATE_POWERUPS": {
            const powerUps = { ...state.powerUps };
            (Object.entries(state.powerUps) as [PowerUpType, PowerUpProperties][])
            .forEach(([k,v]) => {
                if(v.expiresAt && v.expiresAt <= action.now){
                    powerUps[k] = {
                        active: false,
                        expiresAt: null
                    }
                }
            })

            return {
                ...state,
                powerUps
            }
        }

        default:
            return state;
    }
}