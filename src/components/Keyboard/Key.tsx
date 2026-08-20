import { useGameContext } from "@/providers/GameProvider";
import type { keyType } from "@/types/keyType";

export default function Key({ keyOptions }: { keyOptions: keyType }) {
    const widthStyle = keyOptions.length ? { width: keyOptions.length } : {flexGrow : 1};
    const {isPressed, isHitTarget, isBomb} = useGameContext();

    return (
        <div className={`p-0.5 flex ${keyOptions.disabled ? "cursor-not-allowed" : "cursor-pointer"} `} style={widthStyle}>
            <button className={`border-[0.5px] border-black rounded-md flex-center shadow-2xl theme-transition w-full cursor-[inherit]
                ${
                    isHitTarget(keyOptions.label) && !keyOptions.disabled ? 
                    "bg-green-600" : ""
                }
                ${
                    isBomb(keyOptions.label) && !keyOptions.disabled ? 
                    "bg-red-600" : ""
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
            </button>
        </div>
    )
}