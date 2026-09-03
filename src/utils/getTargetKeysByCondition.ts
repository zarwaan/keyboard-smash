import { TARGETS } from "@/configs/targets.config"
import type { TargetType } from "@/types/targets.type"

export function getTargetKeysByCondition(conditionFn: (t: TargetType) => boolean){
    return (Object.keys(TARGETS) as TargetType[]).filter(conditionFn)
}