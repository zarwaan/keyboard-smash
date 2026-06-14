import { useGameContext } from "@/providers/GameProvider";
import ControlButtonTemplate from "./ControlButtonTemplate";

export default function StartButton({}) {
    const {startGame} = useGameContext();
    return (
        <ControlButtonTemplate
            label="Start"
            onClickAction={() => {console.log("Game started"); startGame();}}
        />
    )
}