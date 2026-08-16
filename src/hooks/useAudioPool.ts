import { AUDIO_TRACKS } from "@/configs/sounds.configs";
import { useUIContext } from "@/providers/UIProvider";
import { useRef } from "react";

export interface AudioController {
    play: () => void,
    stop: () => void,
    pause: () => void,
}

export default function useAudioPool(id: keyof typeof AUDIO_TRACKS) {
    const {isMusicMuted, areEffectsMuted} = useUIContext();
    const thisAudio = AUDIO_TRACKS[id]
    const pool = 
    useRef(
        Array.from(
            {length: thisAudio.poolSize},
            () => {
                const a = new Audio(thisAudio.src);
                a.volume = thisAudio.volume;
                a.loop = id === "bg";
                return a
            }
        )
    );

    const play = () => {
        const a = thisAudio.poolSize === 1 ? pool.current[0] : pool.current.find(a => a.paused);
        if(!a) return
        if(
            thisAudio.audioType === "Music" && !isMusicMuted
            ||
            thisAudio.audioType === "Effect" && !areEffectsMuted
        )
        a.play();
    };

    const stop = () => {
        if(thisAudio.poolSize > 1) return;
        const a = pool.current[0];
        a.pause();
        a.currentTime=0;
    }

    const pause = () => {
        if(thisAudio.poolSize > 1) return;
        const a = pool.current[0];
        a.pause();
    }

    const controller : AudioController = {
        play,
        stop,
        pause 
    }

    return controller
}