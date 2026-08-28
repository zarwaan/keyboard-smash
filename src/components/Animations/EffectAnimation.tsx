import type { TargetType } from "@/state/GameReducer";
import type { EffectAndTargetAnimation } from "./TemplateAnimation";
import hitEff from '@/assets/images/effects/hit.webm';
import explosion from '@/assets/images/effects/explosion.webm';
import heartsEff from '@/assets/images/effects/heartsEff.webm';
import energy from '@/assets/images/effects/energy_shield.webm';
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
        },
        life: {
            src: heartsEff,
            className: ''
        },
        shield: {
            src: energy,
            className: 'scale-120'
        },
    }

    const anim = configs[type];

    return <TemplateAnimation src={anim.src} className={anim.className} />
}