import { useGameContext } from "@/providers/GameProvider";
import ControlButtons from "./ControlButtons/ControlButtons";

export default function GameControls({}) {
    const {gameState, isPaused, isgameOver} = useGameContext();
    const controlButtons = ControlButtons();
    return (
        <div className="text-(--text-color) w-fit theme-transition flex flex-row gap-5 m-auto">
            {gameState==='stopped' && controlButtons.Start}
            {gameState==='ongoing' && controlButtons.Reset}
            {gameState==='ongoing' && isPaused && !isgameOver && controlButtons.Resume}
            {gameState==='ongoing' && !isPaused && controlButtons.Pause}
        </div>
    )
}