import { useGameContext } from "@/providers/GameProvider"
import Lives from "./Lives";
import { useGameSettingsContext } from "@/providers/GameSettingsProvider";
import { useEffect } from "react";

export default function Score({}) {
    const {score, gameState} = useGameContext();
    const {playMode} = useGameSettingsContext();
    useEffect(() => {
        console.log(score.lives)
    }, [score.lives])
    return (
        <div className=" w-fit text-(--text-color) theme-transition text-4xl font-bold flex flex-col gap-6">
            {
                playMode!=="infinite" && gameState!=='stopped' &&
                <>
                    <div className="flex flex-row gap-10 font-(family-name:--header-font) tracking-widest text-[40px]">
                        <span>Targets hit : {score.targetsHit}</span>
                        <span>Targets missed : {score.targetsMissed}</span>
                        <span>Bombs hit : {score.bombsHit}</span>
                    </div>
                    <Lives key={'new'}/>
                </>
            }
        </div>
    )
}