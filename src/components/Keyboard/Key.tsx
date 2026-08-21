import { useGameContext } from "@/providers/GameProvider";
import type { keyType } from "@/types/keyType";
import dig from '@/assets/images/diglett.webm'
import bomb from '@/assets/images/bomb.webm'

export default function Key({ keyOptions }: { keyOptions: keyType }) {
    const widthStyle = keyOptions.length ? { width: keyOptions.length } : {flexGrow : 1};
    const {isPressed, isHitTarget, isBomb} = useGameContext();
    const videoSrc = 
    isHitTarget(keyOptions.label) && !keyOptions.disabled ? 
    dig 
    :
    isBomb(keyOptions.label) && !keyOptions.disabled ? 
    bomb 
    : 
    null

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
                    "bg-yellow-600 duration-0" : ""
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
                        <video autoPlay loop muted playsInline className="max-h-full">
                            <source src={videoSrc} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    }
                    </div>
            </button>
        </div>
    )
}