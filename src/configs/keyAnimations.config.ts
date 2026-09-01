import type { TargetType } from "@/state/GameReducer"

// import targeting animations
import dig from '@/assets/images/targets/diglett.webm';
import bomb from '@/assets/images/targets/bomb.webm';
import shield from '@/assets/images/targets/shield.webm';
import life from '@/assets/images/targets/life.webm';
import thor from '@/assets/images/targets/thor.webm'

//import effect animations
import hitEff from '@/assets/images/effects/hit.webm';
import explosion from '@/assets/images/effects/explosion.webm';
import heartsEff from '@/assets/images/effects/heartsEff.webm';
import energy from '@/assets/images/effects/energy_shield.webm';
import fireAllEff from '@/assets/images/effects/fireAll.webm';

export interface AnimationProperties {
    src: string,
    className: string,
    speed?: number
}

export type AnimationKind = 'targeting' | 'effect'
export type AnimationValues = Record<AnimationKind,AnimationProperties>
export type Animation = Record<TargetType,AnimationValues>

export const keyAnimations : Animation = {
    target: {
        targeting:{
            src: dig,
            className: 'max-h-full scale-90'
        },
        effect:{
            src: hitEff,
            className: 'scale-140'
        },
    },
    bomb:{
        targeting:{
            src: bomb,
            className: 'scale-65'
        },
        effect:{
            src: explosion,
            className: 'scale-65'
        },
    },
    shield:{
        targeting:{
            src: shield,
            className: 'scale-75'
        },
        effect:{
            src: energy,
            className: 'scale-120'
        },
    },
    life:{
        targeting:{
            src: life,
            className: 'scale-85'
        },
        effect:{
            src: heartsEff,
            className: ''
        },
    },
    fireAll:{
        targeting:{
            src: thor,
            className: 'scale-85'
        },
        effect:{
            src: fireAllEff,
            className: '',
            speed: 0.5
        },
    },
}