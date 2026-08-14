import { useGameContext } from "@/providers/GameProvider"

export default function Score({}) {
    const {score} = useGameContext();
    return (
        <div className="borde w-fit text-(--text-color) theme-transition text-4xl font-bold">
            Targets hit : {score.targetsHit} &nbsp;
            Targets missed : {score.targetsMissed} &nbsp;
            Bombs hit : {score.bombsHit}
        </div>
    )
}