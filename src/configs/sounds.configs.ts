import bgMusic from "@/assets/audio/music/bgmusic2.mp3" //
import missEffect from "@/assets/audio/effects/miss2.mp3" //
import gameover from "@/assets/audio/effects/gameover.mp3" //

import type { AudioTrackInterface } from "@/types/sounds.type"
import { getTargetKeysByCondition } from "@/utils/getTargetKeysByCondition"
import { TARGETS } from "./targets.config"
import type { TargetType } from "@/types/targets.type"

const NonTargetAudios = {
    'bg' : {
        src: bgMusic,
        volume: 1,
        poolSize: 1,
        audioType: "Music"
    },
    'miss' : {
        src: missEffect,
        volume: 0.3,
        poolSize: 5,
        audioType: "Effect"
    },
    'game_over' : {
        src: gameover,
        volume: 1,
        poolSize: 1,
        audioType: "Effect"
    },
} as const satisfies Record<string, AudioTrackInterface>

const TargetAudios = {} as Record<TargetType, AudioTrackInterface>;

getTargetKeysByCondition(() => true).forEach(t => {
    TargetAudios[t] = TARGETS[t].soundEffect
});

export const AUDIO_TRACKS = {
    ...TargetAudios satisfies Record<TargetType, AudioTrackInterface>,
    ...NonTargetAudios,
} as const satisfies Record<string, AudioTrackInterface>