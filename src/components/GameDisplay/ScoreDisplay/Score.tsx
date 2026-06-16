import { useGameContext } from "@/providers/GameProvider"

export default function Score({}) {
    const {score} = useGameContext();
    return (
        <div className="border w-fit text-(--text-color) theme-transition text-4xl font-bold">
            Targets hit : {score.targetHits} <br />
            Bombs hit : {score.bombHits}
        </div>
    )
}