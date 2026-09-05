import type { GameSettings } from "@/providers/GameSettingsProvider";

export interface difficultyProps {
    targetInterval: number, 
    timeActive: number, 
    bombProbability: number
}

export const difficulties : 
        Record<GameSettings['difficulty'], difficultyProps>
        =
        {
            "easy": {
                targetInterval: 2500,
                timeActive: 3000,
                bombProbability: 0.1
            },
            "medium": {
                targetInterval: 1800,
                timeActive: 2200,
                bombProbability: 0.2
            },
            "hard": {
                targetInterval: 1200,
                timeActive: 1500,
                bombProbability: 0.3
            },
            "impossible": {
                targetInterval: 700,
                timeActive: 900,
                bombProbability: 0.4
            },
            "incr": {
                targetInterval: 2500,
                timeActive: 3000,
                bombProbability: 0.1
            },
        }

export const STEP_EVERY = 15; // in seconds
export const STEPS = 10;

export const stepIncrements: difficultyProps = {
    timeActive: -200,
    targetInterval: -200,
    bombProbability: 0.03
}