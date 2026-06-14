import { useGameContext } from "@/providers/GameProvider";
import ControlButtonTemplate from "./ControlButtonTemplate";

export default function ResumeButton({}) {
    const {resumeGame} = useGameContext();
    return (
        <ControlButtonTemplate
            label="Resume"
            onClickAction={() => {console.log("Game resumed"); resumeGame();}}
        />
    )
}