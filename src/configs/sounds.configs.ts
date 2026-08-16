import hitEffect from "@/assets/audio/effects/hit.mp3"
import bgMusic from "@/assets/audio/music/bgmusic2.mp3"
import missEffect from "@/assets/audio/effects/miss2.mp3"
import bombEffect from "@/assets/audio/effects/bomb2.mp3"
import gameover from "@/assets/audio/effects/gameover.mp3"

export interface AudioTrackInterface {
    src: string,
    volume: number,
    poolSize: number,
    audioType: "Music" | "Effect",
}

export const AUDIO_TRACKS = {
    'bg' : { // must repeat
        src: bgMusic,
        volume: 1,
        poolSize: 1,
        audioType: "Music"
    },
    'hit' : {
        src: hitEffect,
        volume: 1,
        poolSize: 5,
        audioType: "Effect"
    },
    'miss' : {
        src: missEffect,
        volume: 0.3,
        poolSize: 5,
        audioType: "Effect"
    },
    'bomb' : {
        src: bombEffect,
        volume: 1,
        poolSize: 5,
        audioType: "Effect"
    },
    'game_over' : {
        src: gameover,
        volume: 1,
        poolSize: 1,
        audioType: "Effect"
    }
} satisfies Record<string, AudioTrackInterface>