import { QwertyRows } from "@/configs/keys.config";
import { createContext, useContext, useEffect, useReducer, useRef, useState } from "react";
import { useGameSettingsContext } from "./GameSettingsProvider";
import { difficulties, STEP_EVERY, stepIncrements, STEPS } from "@/configs/difficulties.config";
import { useSoundContext } from "./SoundProvider";
import { useKeyboardInput } from "@/hooks/useKeyboardInput";
import { gameReducer, initialGameState, type Target, type HitEvent, type Score, type GameReducerState } from "@/state/GameReducer";
import { useUIContext } from "./UIProvider";
import type { GameEvent, TargetType } from "@/types/targets.type";
import { TARGETS } from "@/configs/targets.config";
import useEffectLog from "@/hooks/useEffectLog";

interface GameState {
    gameId: number;
    pressedKeys: Set<string>;
    isPressed: (keyValue: string) => boolean;
    targetKeys: Target[];
    getTargetType: (keyValue: string) => TargetType | undefined;
    hitEvents: HitEvent[];
    hitEvent: (keyValue: string) => HitEvent | undefined;
    gameState: GameReducerState['gameState'];
    isPaused: boolean;
    isgameOver: boolean;
    startGame: () => void;
    stopGame: () => void;
    pauseGame: () => void;
    resumeGame: () => void;
    score: Score;
    gameEventSequence: GameEvent[];
    powerUps: GameReducerState['powerUps']
}

const GameContext = createContext<GameState>({} as GameState)

const ACTIVE_ROWS = [QwertyRows[1], QwertyRows[2], QwertyRows[3], QwertyRows[4]];
const ALL_KEYS = ACTIVE_ROWS.flat().map(key => key.toLowerCase());

function pickRandomKey(exclude: Set<string>): string | null {
    const available = ALL_KEYS.filter(key => !exclude.has(key));
    if (available.length === 0) return null;
    return available[Math.floor(Math.random() * available.length)];
}

export default function GameProvider({ children }: { children: React.ReactNode }) {
    const { difficulty, playMode } = useGameSettingsContext();
    const initDiffProperties = difficulties[difficulty];
    const { gameAudios } = useSoundContext();
    const bgMusic = gameAudios.bg;
    const [diff, setDiff] = useState(initDiffProperties);
    const { createToast } = useUIContext();
    const [step, setStep] = useState(0);

    useEffect(() => {
        setDiff(initDiffProperties)
    },[initDiffProperties])

    const POWERUP_PROBABILITY = 0.03; // IMP REMEMBER TO CHANGE
    const PROBABILITIES : Record<TargetType,number> = {
        bomb: diff.bombProbability,
        shield: POWERUP_PROBABILITY,
        life: POWERUP_PROBABILITY,
        fireAll: POWERUP_PROBABILITY,
        target: 0,
    };
    PROBABILITIES['target'] = 1 - Object.values(PROBABILITIES).reduce((acc,curr) => acc+curr,0);

    function getRandomTargetType(): TargetType {
        const random = Math.random();
        let cumulativeProbability = 0;

        return (Object.keys(TARGETS) as TargetType[]).find(type => {
            cumulativeProbability += PROBABILITIES[type];
            return random < cumulativeProbability;
        })!;
    }

    const [state, dispatch] = useReducer(gameReducer, initialGameState);
    const { pressedKeys, isPressed } = useKeyboardInput(!state.isPaused, state.powerUps.fireAll.active, ALL_KEYS);

    const stateRef = useRef(state);
    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    const playModeRef = useRef(playMode);
    useEffect(() => {
        playModeRef.current = playMode;
    }, [playMode]);

    const isInfiniteLives = () => playModeRef.current === "infinite";

    const getTargetType : GameState['getTargetType'] = (keyValue: string) => 
        state.targetKeys.find(t => t.key.toLowerCase() === keyValue.toLowerCase())?.type;
    const hitEvent = (keyValue: string) =>
        state.hitEvents.find(e => e.key.toLowerCase() === keyValue.toLowerCase());
    const pausedAtRef = useRef(0);

    const startGame = () => {
        const now = Date.now()
        setStep(0);
        dispatch({ type: "START_GAME", now });
        bgMusic.play();
    };

    const stopGame = () => {
        dispatch({ type: "STOP_GAME" });
        bgMusic.stop();
    };

    const pauseGame = () => {
        dispatch({ type: "PAUSE_GAME" });
        pausedAtRef.current = Date.now();
        bgMusic.pause();
    };

    const resumeGame = () => {
        dispatch({ type: "RESUME_GAME", pausedDuration: Date.now() - pausedAtRef.current });
        bgMusic.play();
    };

    useEffect(() => {
        const target = state.targetKeys.find(t => pressedKeys.has(t.key.toLowerCase()));
        if (!target) return;

        dispatch({ type: "HIT_TARGET", key: target.key, now: Date.now(), infiniteLives: isInfiniteLives() });

        gameAudios[target.type].play();

        if(target.type==="shield") 
            createToast({ type: "INFO", label: "Shield Activated!" })
        
    }, [pressedKeys, state.targetKeys]);

    useEffect(() => {
        if (state.gameState !== "ongoing") return;

        const spawn = () => {
            const occupied = new Set(stateRef.current.targetKeys.map(t => t.key));
            const key = pickRandomKey(occupied);
            if (!key) return;
            dispatch({
                type: "ADD_TARGET",
                target: { 
                    key, 
                    expiresAt: Date.now() + diff.timeActive, 
                    type: getRandomTargetType()
                },
            });
        };

        spawn();
        
        const id = window.setInterval(() => {
            if (!stateRef.current.isPaused) spawn();
        }, diff.targetInterval);

        return () => window.clearInterval(id);
    }, [state.gameState, diff.targetInterval, diff.timeActive, diff.bombProbability]);

    useEffect(() => {
        const id = window.setInterval(() => {
            if (stateRef.current.isPaused || stateRef.current.gameState==='stopped') return;
            const now = Date.now();

            if(!stateRef.current.powerUps.shield.active) {
                const missed = stateRef.current.targetKeys.filter(t => t.expiresAt <= now && t.type==="target").length;
                if (missed > 0) gameAudios.miss.play();
            }

            dispatch({ type: "EXPIRE_TARGETS", now, infiniteLives: isInfiniteLives() });
            dispatch({ type: "CLEANUP_HIT_EVENTS", now });
            dispatch({ type: "DEACTIVATE_POWERUPS", now});

            dispatch({ type: 'TICK', now})
            const stepTemp = Math.floor( stateRef.current.timeKeeping.elapsed / (STEP_EVERY * 1000))

            if(
                stepTemp <= STEPS 
            )
                setStep(stepTemp)

        }, 100);

        return () => window.clearInterval(id);
    }, []);

    useEffect(() => {
        if (!state.isGameOver) return;
        pauseGame();
        gameAudios['game_over'].play();
    }, [state.isGameOver]);

    useEffect(() => {
        if(step===0 || difficulty!=='incr') return;
        setDiff(prev => ({
            bombProbability: Number((prev.bombProbability + stepIncrements.bombProbability).toFixed(2)),
            timeActive: prev.timeActive + stepIncrements.timeActive,
            targetInterval: prev.targetInterval + stepIncrements.targetInterval
        }))
    },[step]);

    useEffectLog(JSON.stringify(diff));

    return (
        <GameContext.Provider
            value={{
                gameId: state.gameId,
                pressedKeys,
                isPressed,
                targetKeys: state.targetKeys,
                getTargetType,
                hitEvents: state.hitEvents,
                hitEvent,
                gameState: state.gameState,
                isPaused: state.isPaused,
                isgameOver: state.isGameOver,
                startGame,
                stopGame,
                pauseGame,
                resumeGame,
                score: state.score,
                gameEventSequence: state.gameEventSequence,
                powerUps: state.powerUps
            }}
        >
            {children}
        </GameContext.Provider>
    );
}

export function useGameContext() {
    return useContext(GameContext);
}