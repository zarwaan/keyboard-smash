import type { TargetType } from "@/state/GameReducer";
import type { EffectAndTargetAnimation } from "./TemplateAnimation";
import hitEff from '@/assets/images/hit.webm';
import explosion from '@/assets/images/explosion.webm';
import TemplateAnimation from "./TemplateAnimation";

export default function EffectAnimation({type} : {type: TargetType}) {
    
    const configs : Record<TargetType, EffectAndTargetAnimation> = {
        target: {
            src: hitEff,
            className: 'scale-140'
        },
        bomb: {
            src: explosion,
            className: 'scale-65'
        }
    }

    const anim = configs[type];

    return <TemplateAnimation src={anim.src} className={anim.className} />
}