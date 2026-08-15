import { useGameContext } from "@/providers/GameProvider";
import PauseButton from "./ControlButtons.tsx/PauseButton";
import ResumeButton from "./ControlButtons.tsx/ResumeButton";
import StartButton from "./ControlButtons.tsx/StartButton";
import StopButton from "./ControlButtons.tsx/StopButton";

export default function GameControls({}) {
    const {gameState, isPaused, isgameOver} = useGameContext();
    return (
        <div className="text-(--text-color) w-fit theme-transition flex flex-row gap-5 m-auto">
            {gameState==='stopped' && <StartButton />}
            {gameState==='ongoing' && <StopButton />}
            {gameState==='ongoing' && isPaused && !isgameOver && <ResumeButton />}
            {gameState==='ongoing' && !isPaused && <PauseButton />}
        </div>
    )
}