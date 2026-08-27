import { AUDIO_TRACKS } from "@/configs/sounds.configs";
import { useUIContext } from "@/providers/UIProvider";
import { useMemo, useRef, useEffect } from "react";

export interface AudioController {
    play: () => void,
    stop: () => void,
    pause: () => void,
}

export default function useAudioPool(id: keyof typeof AUDIO_TRACKS) {
    const {isMusicMuted, areEffectsMuted} = useUIContext();
    const thisAudio = AUDIO_TRACKS[id];
    const isMutedRef = useRef(
        thisAudio.audioType === "Music"
            ? isMusicMuted
            : areEffectsMuted
    );

    useEffect(() => {
        isMutedRef.current =
            thisAudio.audioType === "Music"
                ? isMusicMuted
                : areEffectsMuted;
    }, [isMusicMuted, areEffectsMuted]);

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
        if(isMutedRef.current) return;
        // if(
        //     (thisAudio.audioType === "Music" && !isMusicMuted)
        //     ||
        //     (thisAudio.audioType === "Effect" && !areEffectsMuted)
        // )
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

    const controller : AudioController = useMemo(() =>  { return {
        play,
        stop,
        pause 
    }}, [play,stop,pause])

    return controller
}