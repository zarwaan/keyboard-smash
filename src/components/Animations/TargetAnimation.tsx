import type { TargetType } from "@/state/GameReducer";
import dig from '@/assets/images/targets/diglett.webm';
import bomb from '@/assets/images/targets/bomb.webm';
import shield from '@/assets/images/targets/shield.webm';
import life from '@/assets/images/targets/life.webm';
import type { EffectAndTargetAnimation } from "./TemplateAnimation";
import TemplateAnimation from "./TemplateAnimation";

export default function TargetAnimation({type} : {type: TargetType}) {

    const configs : Record<TargetType, EffectAndTargetAnimation> = {
        target: {
            src: dig,
            className: 'max-h-full scale-90'
        },
        bomb: {
            src: bomb,
            className: 'scale-65'
        },
        shield: {
            src: shield,
            className: 'scale-75'
        },
        life: {
            src: life,
            className: 'scale-85'
        },
    }
    
    const anim = configs[type];

    return <TemplateAnimation src={anim.src} className={anim.className} />
}