import { useGameContext } from "@/providers/GameProvider";
import ControlButtonTemplate from "./ControlButtonTemplate";

export default function PauseButton({}) {
    const {pauseGame} = useGameContext();
    return (
        <ControlButtonTemplate
            label="Pause"
            onClickAction={() => {console.log("Game pause"); pauseGame();}}
        />
    )
}