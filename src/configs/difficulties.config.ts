import type { GameSettings } from "@/providers/GameSettingsProvider";

export const difficulties : 
        Record<GameSettings['difficulty'], {targetInterval: number, timeActive: number, bombProbability: number}>
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