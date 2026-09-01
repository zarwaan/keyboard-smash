import { keyAnimations, type AnimationKind } from "@/configs/keyAnimations.config";
import type { TargetType } from "@/state/GameReducer";
import { useRef, useEffect } from "react";

export default function KeyAnimation({targetName, animationKind}: {targetName: TargetType, animationKind: AnimationKind}) {
    const {src, speed, className} = keyAnimations[targetName][animationKind];
    if(!src) return;

    const ref = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        if(ref.current && speed){
            ref.current.playbackRate = speed
        }
    },[ref.current, speed])
    
    return (
            <video autoPlay loop muted playsInline className={className} ref={ref}>
                <source src={src} type="video/webm" />
                Your browser does not support the video tag.
            </video>
    )
}