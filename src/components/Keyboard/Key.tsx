import { useGameContext } from "@/providers/GameProvider";
import type { keyType } from "@/types/keyType";
import dig from '@/assets/images/diglett.webm';
import bomb from '@/assets/images/bomb.webm';
import hammer from '@/assets/images/hammer.webm';
import { useEffect, useRef } from "react";
import hitEff from '@/assets/images/hit.webm';
import explosion from '@/assets/images/explosion.webm';

export default function Key({ keyOptions }: { keyOptions: keyType }) {
    const widthStyle = keyOptions.length ? { width: keyOptions.length } : {flexGrow : 1};
    const {isPressed, isHitTarget, isBomb, hitEvent} = useGameContext();

    const hit = keyOptions.disabled ? undefined : hitEvent(keyOptions.label)
    const keyPress = isPressed(keyOptions.label) && !keyOptions.disabled;

    const videoSrc = 
    isHitTarget(keyOptions.label) && !keyOptions.disabled ? dig 
    :
    isBomb(keyOptions.label) && !keyOptions.disabled ? bomb 
    : 
    null;

    const hitEffSrc = 
    hit && hit.type==='target' ? hitEff
    :
    hit && hit.type==='bomb' ? explosion
    :
    null;
    
    const hammerVideoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        if(!hammerVideoRef.current) return;
        let v = hammerVideoRef.current;
        if(keyPress){
            v.style.display = 'block';
            v.playbackRate = 5;
            if(v.ended) v.currentTime=0
            v.play();
        }
    },[keyPress]);

    return (
        <div className={`p-0.5 flex ${keyOptions.disabled ? "cursor-not-allowed" : "cursor-pointer"} `} style={widthStyle}>
            <button className={`border-[0.5px] border-black rounded-md flex-center shadow-2xl theme-transition w-full cursor-[inherit] relative
                ${
                    isHitTarget(keyOptions.label) && !keyOptions.disabled ? 
                    "" : ""
                    // bg-green-600
                }
                ${
                    isBomb(keyOptions.label) && !keyOptions.disabled ? 
                    "" : ""
                    // bg-red-600
                }
                ${
                    isPressed(keyOptions.label) && !keyOptions.disabled ? 
                    "" : ""
                    // bg-yellow-600 duration-0
                }
                ${
                    keyOptions.disabled ?
                    "bg-(--key-bg-color-disabled) text-(--key-text-color-disabled)" :
                    "bg-(--key-color) text-(--key-text-color)"
                }
                `} >
                {
                    keyOptions.label === "space" ? "" :
                    keyOptions.label === "Blank" ? "⏻" :
                    (keyOptions.label === "shiftleft" || keyOptions.label === "shiftright") ? "shift" :
                    keyOptions.label
                }
                    <div className="borde border-red-500 aspect-square absolute max-h-full flex-center">
                    {
                        videoSrc &&
                        <video autoPlay loop muted playsInline 
                        className={`borde ${videoSrc===dig ? 'max-h-full scale-90' : videoSrc===bomb ? 'scale-65' : ''}`}>
                            <source src={videoSrc} type="video/webm" />
                            Your browser does not support the video tag.
                        </video>
                    }
                    {
                        hitEffSrc &&
                        <video autoPlay loop muted playsInline 
                        className={`${hitEffSrc===hitEff ? 'scale-140' : hitEffSrc===explosion ? 'scale-65' : ''}`}>
                            <source src={hitEffSrc} type="video/webm" />
                            Your browser does not support the video tag.
                        </video>
                    }
                    </div>
                    <div className="borde border-purple-500 absolute inset-0 flex justify-center items-end pointer-events-none overflow-visible">
                    {
                        <video muted playsInline className="borde border-green-600 z-10 w-30 max-w-none translate-x-5.75 hidden" ref={hammerVideoRef}
                            onEnded={e => {
                                if(!keyPress){
                                    e.currentTarget.style.display = 'none'
                                }
                                else{
                                    e.currentTarget.currentTime = 0;
                                    e.currentTarget.play();
                                }
                            }}    
                        >
                            <source src={hammer} type="video/webm" />
                            Your browser does not support the video tag.
                        </video>
                    }
                    </div>
            </button>
        </div>
    )
}