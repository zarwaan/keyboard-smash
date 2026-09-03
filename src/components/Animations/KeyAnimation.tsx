import { TARGETS } from "@/configs/targets.config";
import type { AnimationKind, AnimationProperties } from "@/types/animations.type";
import type { TargetType } from "@/types/targets.type";
import { useRef, useEffect } from "react";

export default function KeyAnimation({targetName, animationKind}: {targetName: TargetType, animationKind: AnimationKind}) {
    const {src, speed, className} = TARGETS[targetName]['animation'][animationKind] as AnimationProperties;
    
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