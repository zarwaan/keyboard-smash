import { useGameContext } from "@/providers/GameProvider";
import ControlButtonTemplate from "./ControlButtonTemplate";

export default function StopButton({}) {
    const {stopGame} = useGameContext()
    return (
        <ControlButtonTemplate
            label="Quit"
            onClickAction={() => {console.log("Game stopped"); stopGame()}}
        />
    )
}