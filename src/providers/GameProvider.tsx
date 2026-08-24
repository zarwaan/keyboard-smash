import { QwertyRows } from "@/configs/keys.config";
import { createContext, useContext, useEffect, useReducer, useRef } from "react";
import { useGameSettingsContext } from "./GameSettingsProvider";
import { difficulties } from "@/configs/difficulties.config";
import { useSoundContext } from "./SoundProvider";
import { useKeyboardInput } from "@/hooks/useKeyboardInput";
import { gameReducer, initialGameState, type Target, type HitEvent, type Score, type GameReducerState } from "@/state/GameReducer";

interface GameState {
    gameId: number;
    pressedKeys: Set<string>;
    isPressed: (keyValue: string) => boolean;
    targetKeys: Target[];
    isHitTarget: (keyValue: string) => boolean;
    isBomb: (keyValue: string) => boolean;
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
    const { bombEffect, hitEffect, missEffect, bgMusic, gameOverEffect } = useSoundContext();
    const { targetInterval, timeActive, bombProbability } = difficulties[difficulty];

    const [state, dispatch] = useReducer(gameReducer, initialGameState);
    const { pressedKeys, isPressed } = useKeyboardInput(!state.isPaused);

    const stateRef = useRef(state);
    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    const playModeRef = useRef(playMode);
    useEffect(() => {
        playModeRef.current = playMode;
    }, [playMode]);

    const isInfiniteLives = () => playModeRef.current === "infinite";

    const isHitTarget = (keyValue: string) =>
        state.targetKeys.some(t => t.key.toLowerCase() === keyValue.toLowerCase() && !t.isBomb);
    const isBomb = (keyValue: string) =>
        state.targetKeys.some(t => t.key.toLowerCase() === keyValue.toLowerCase() && t.isBomb);
    const hitEvent = (keyValue: string) =>
        state.hitEvents.find(e => e.key.toLowerCase() === keyValue.toLowerCase());
    const pausedAtRef = useRef(0);

    const startGame = () => {
        dispatch({ type: "START_GAME" });
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
        (target.isBomb ? bombEffect : hitEffect).play();
    }, [pressedKeys]);

    useEffect(() => {
        if (state.gameState !== "ongoing") return;

        const spawn = () => {
            const occupied = new Set(stateRef.current.targetKeys.map(t => t.key));
            const key = pickRandomKey(occupied);
            if (!key) return;
            dispatch({
                type: "ADD_TARGET",
                target: { key, expiresAt: Date.now() + timeActive, isBomb: Math.random() < bombProbability },
            });
        };

        spawn();
        const id = window.setInterval(() => {
            if (!stateRef.current.isPaused) spawn();
        }, targetInterval);

        return () => window.clearInterval(id);
    }, [state.gameState, targetInterval, timeActive, bombProbability]);

    useEffect(() => {
        const id = window.setInterval(() => {
            if (stateRef.current.isPaused) return;
            const now = Date.now();

            const missed = stateRef.current.targetKeys.filter(t => t.expiresAt <= now && !t.isBomb).length;
            if (missed > 0) missEffect.play();

            dispatch({ type: "EXPIRE_TARGETS", now, infiniteLives: isInfiniteLives() });
            dispatch({ type: "CLEANUP_HIT_EVENTS", now });
        }, 100);

        return () => window.clearInterval(id);
    }, []);

    useEffect(() => {
        if (!state.isGameOver) return;
        pauseGame();
        gameOverEffect.play();
    }, [state.isGameOver]);

    return (
        <GameContext.Provider
            value={{
                gameId: state.gameId,
                pressedKeys,
                isPressed,
                targetKeys: state.targetKeys,
                isHitTarget,
                isBomb,
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
            }}
        >
            {children}
        </GameContext.Provider>
    );
}

export function useGameContext() {
    return useContext(GameContext);
}