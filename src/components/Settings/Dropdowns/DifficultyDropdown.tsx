import Dropdown from "@/components/Utils/Dropdown";
import { useGameSettingsContext, type GameSettings } from "@/providers/GameSettingsProvider";

export default function DifficultyDropdown({z} : {z:number}) {
    const {difficulty, setDifficulty} = useGameSettingsContext();
    const zindex = z+10;
    return (
        <div className={`w-25/100 borde border-green-300 ${"z-"+zindex} z-20`}>
            <Dropdown<GameSettings['difficulty']>
                optionList={[
                    {label: "Easy", value:"easy"},
                    {label: "Medium", value:"medium"},
                    {label: "Hard", value:"hard"},
                    {label: "Impossible", value:"impossible"},
                    {label: "Increasing", value:"incr"},
                ]}
                onOptionSelect={setDifficulty}
                selectedOption={difficulty}
            />
        </div>
    )
}