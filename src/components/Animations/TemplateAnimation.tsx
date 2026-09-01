import { useEffect, useRef } from "react";

export interface EffectAndTargetAnimation {
    src: string,
    className: string
    speed? : number
}

export default function TemplateAnimation({src, className, speed} : EffectAndTargetAnimation) {
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