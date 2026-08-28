import type { TargetType } from "@/state/GameReducer";
import dig from '@/assets/images/diglett.webm';
import bomb from '@/assets/images/bomb.webm';
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
        }
    }
    
    const anim = configs[type];

    return <TemplateAnimation src={anim.src} className={anim.className} />
}