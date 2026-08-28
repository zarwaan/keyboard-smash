import { useRef, useEffect } from "react";
import hammer from '@/assets/images/hammer.webm';

export default function HammerAnimation({keyPress} : {keyPress: boolean}) {

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
        <div className="borde border-purple-500 absolute inset-0 flex justify-center items-end pointer-events-none overflow-visible">
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
                <source src={hammer} />
                Your browser does not support the video tag.
            </video>
        </div>
    )
}