import { useGameContext } from "@/providers/GameProvider";

export type ButtonLabel = 'Pause' | 'Resume' | 'Start' | 'Reset'

export interface ControlButton {
    label: ButtonLabel,
    bgColor: string,
    onClickAction: () => void,
}

export default function useControlButtonConfig() :
    Record<ButtonLabel,ControlButton>
{
    const {startGame, stopGame, pauseGame, resumeGame} = useGameContext();
    return {
        Start: {
            label: "Start",
            bgColor: "bg-green-800",
            onClickAction: startGame
        },
        Reset: {
            label: "Reset",
            bgColor: "bg-red-800",
            onClickAction: stopGame
        },
        Pause: {
            label: "Pause",
            bgColor: "bg-indigo-700",
            onClickAction: pauseGame
        },
        Resume: {
            label: "Resume",
            bgColor: "bg-indigo-700",
            onClickAction: resumeGame
        },
    }
}

