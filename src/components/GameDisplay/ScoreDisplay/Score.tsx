import { useGameContext } from "@/providers/GameProvider"
import Lives from "./Lives";
import { useGameSettingsContext } from "@/providers/GameSettingsProvider";
import { useEffect } from "react";
import returnTextResult from "@/utils/returnTextResult";
import { useUIContext } from "@/providers/UIProvider";

export default function Score({}) {
    const {score, gameState, isgameOver} = useGameContext();
    const {playMode, difficulty} = useGameSettingsContext();
    const {walkthroughPhase, createToast} = useUIContext();
    useEffect(() => {
        console.log(score.lives)
    }, [score.lives])

    const shareScore = async () => {
        try{
            const [success, _] = await returnTextResult(score, difficulty);
            if(success)
                createToast({
                    type: 'SUCCESS',
                    label: 'Copied to clipboard!'
                })
        }
        catch (err){
            console.error(err);
        }
    }

    return (
        <div className=" w-fit text-(--text-color) theme-transition text-4xl font-bold flex flex-col gap-6">
            {
                (
                    (gameState!=='stopped')
                    ||
                    walkthroughPhase!=='$$OVER$$'
                )
                &&
                <>
                    <div className="flex flex-row gap-10 font-(family-name:--header-font) tracking-widest text-[40px] relative">
                        <span>Targets hit : {score.targetsHit}</span>
                        <span>Targets missed : {score.targetsMissed}</span>
                        <span>Bombs hit : {score.bombsHit}</span>
                        {
                            (
                                isgameOver 
                                ||
                                (walkthroughPhase!=='$$OVER$$')
                            )
                            &&
                            <div className="absolute left-[102%] w-[4%] min-h-full flex-center" id="share-score"
                            style={{
                                zIndex: walkthroughPhase==='share_score' ? 10 : 'unset'
                            }}>
                                <button className="w-full cursor-pointer" onClick={shareScore}>
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g strokeLinecap="round" strokeLinejoin="round"></g>
                                    <g> <path d="M9.61109 12.4L10.8183 18.5355C11.0462 19.6939 12.6026 19.9244 13.1565 18.8818L19.0211 7.84263C19.248 7.41555 19.2006 6.94354 18.9737 6.58417M9.61109 12.4L5.22642 8.15534C4.41653 7.37131 4.97155 6 6.09877 6H17.9135C18.3758 6 18.7568 6.24061 18.9737 6.58417M9.61109 12.4L18.9737 6.58417M19.0555 6.53333L18.9737 6.58417" 
                                    stroke="var(--text-color)" strokeWidth="2"></path> 
                                    </g>
                                    </svg>
                                </button>
                            </div>
                        }
                    </div>
                    {
                        playMode!=="infinite" && 
                        <Lives key={'new'}/>
                    }
                </>
            }
        </div>
    )
}