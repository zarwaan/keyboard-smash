import type { AnimationValues } from "@/types/animations.type";
import type { WalkthroughPhaseType } from "@/providers/UIProvider";
import type { AudioTrackInterface } from "@/types/sounds.type";

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

// import sound effects
import hitSeff from "@/assets/audio/effects/hit.mp3"
import bombSeff from "@/assets/audio/effects/bomb2.mp3"
import lifeSeff from "@/assets/audio/effects/life.mp3"
import shieldSeff from "@/assets/audio/effects/shield.mp3"
import fireAllSEff from "@/assets/audio/effects/thor.mp3"

interface TargetProperties {
    label: string,
    kind: string,
    animation: AnimationValues,
    gameSequenceEvent: string,
    emoji: string,
    desc : {
        text: string,
        className: string
    },
    walkthrough: {
        phase: WalkthroughPhaseType,
        keyLabels: string[]
    },
    soundEffect: AudioTrackInterface,
}

export const TARGETS = {
    target: {
        label: 'Target',
        kind: 'hit',
        desc: {
            text: 'Smash your keyboard to hit! Missing one costs you a life',
            className: 'w-[90%]'
        },
        animation: {
            targeting:{
                src: dig,
                className: 'max-h-full scale-90'
            },
            effect:{
                src: hitEff,
                className: 'scale-140'
            },
        },
        gameSequenceEvent: 'HIT_EVENT',
        emoji: '🎯',
        walkthrough: {
            phase: "hit_target_v3",
            keyLabels: ['v','3']
        },
        soundEffect: {
            src: hitSeff,
            volume: 0.8,
            poolSize: 5,
            audioType: "Effect"
        },
    },
    bomb: {
        label: 'Bomb',
        kind: 'bomb',
        desc: {
            text: 'Avoid the bombs, they cost you two lives!',
            className: 'w-[65%]'
        },
        animation: {
            targeting:{
                src: bomb,
                className: 'scale-65'
            },
            effect:{
                src: explosion,
                className: 'scale-65'
            },
        },
        gameSequenceEvent: 'BOMB_EVENT',
        emoji: '💣',
        walkthrough: {
            phase: "bomb_u",
            keyLabels: ['u']
        },
        soundEffect: {
            src: bombSeff,
            volume: 1,
            poolSize: 5,
            audioType: "Effect"
        },
    },
    shield: {
        label: 'Shield',
        kind: 'powerup',
        desc: {
            text:'A 10 second immunity from all misses and bombs',
            className: 'w-[75%]',
        },
        animation: {
            targeting:{
                src: shield,
                className: 'scale-75'
            },
            effect:{
                src: energy,
                className: 'scale-120'
            },
        },
        gameSequenceEvent: 'SHIELD_EVENT',
        emoji: '🛡️',
        walkthrough: {
            phase: "powerups",
            keyLabels: ['g']
        },
        soundEffect: {
            src: shieldSeff,
            volume: 1,
            poolSize: 5,
            audioType: "Effect"
        },
    },
    life: {
        label: "Extra life",
        kind: 'powerup',
        desc: {
            text: 'Adds one life',
            className: 'w-[85%]'
        },
        animation: {
            targeting:{
                src: life,
                className: 'scale-85'
            },
            effect:{
                src: heartsEff,
                className: ''
            },
        },
        gameSequenceEvent: 'EXTRA_LIFE_EVENT',
        emoji: '❤️',
        walkthrough: {
            phase: "powerups",
            keyLabels: ['7']
        },
        soundEffect: {
            src: lifeSeff,
            volume: 1,
            poolSize: 5,
            audioType: "Effect"
        },
    },
    fireAll: {
        label: "Thor's hammer",
        kind: 'powerup',
        desc: {
            text: 'Engages all keys and activates a shield for 10 seconds',
            className: 'w-[85%]'
        },
        animation: {
            targeting:{
                src: thor,
                className: 'scale-85'
            },
            effect:{
                src: fireAllEff,
                className: '',
                speed: 0.5,
            },
        },
        gameSequenceEvent: 'FIRE_ALL_EVENT',
        emoji: '⚡️',
        walkthrough: {
            phase: "powerups",
            keyLabels: ['.']
        },
        soundEffect: {
            src: fireAllSEff,
            volume: 1,
            poolSize: 5,
            audioType: "Effect"
        }
    }
} as const satisfies Record<string, TargetProperties>