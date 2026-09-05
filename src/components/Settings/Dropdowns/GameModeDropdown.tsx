import Dropdown from "@/components/Utils/Dropdown";
import { useGameContext } from "@/providers/GameProvider";
import { useGameSettingsContext, type GameSettings } from "@/providers/GameSettingsProvider";

export default function GameModeDropdown({z} : {z:number}) {
    const {playMode, setPlayMode} = useGameSettingsContext();
    const zindex = z+10;
    const { gameState } = useGameContext();
    return (
        <div className={`w-25/100 borde border-green-300 ${"z-"+zindex} z-25`}>
            <Dropdown<GameSettings['playMode']>
                optionList={[
                    {label: "Lives-based", value:"lives"},
                    {label: "Infinite", value:"infinite"},
                ]}
                onOptionSelect={setPlayMode}
                selectedOption={playMode}
                stop={gameState==='ongoing'}
            />
        </div>
    )
}