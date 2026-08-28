import { useGameContext } from "@/providers/GameProvider";
import type { keyType } from "@/types/keyType";
import { useUIContext } from "@/providers/UIProvider";
import HammerAnimation from "../Animations/HammerAnimation";
import type { TargetType } from "@/state/GameReducer";
import TargetAnimation from "../Animations/TargetAnimation";
import EffectAnimation from "../Animations/EffectAnimation";

export default function Key({ keyOptions }: { keyOptions: keyType }) {
    const widthStyle = keyOptions.length ? { width: keyOptions.length } : {flexGrow : 1};
    const {isPressed, getTargetType, hitEvent} = useGameContext();
    const {walkthroughPhase} = useUIContext();

    const hit = keyOptions.disabled ? undefined : hitEvent(keyOptions.label)
    const keyPress = isPressed(keyOptions.label) && !keyOptions.disabled;

    const targetAnim : TargetType | null =
    (
        (walkthroughPhase==='hit_target_v3' && (keyOptions.label.toLowerCase() === 'v' || keyOptions.label === '3'))
        ||
        (getTargetType(keyOptions.label)==='target' && !keyOptions.disabled)
    ) 
    ? 'target' :
    (
        (walkthroughPhase==='bomb_u' && (keyOptions.label.toLowerCase() === 'u'))
        ||
        (getTargetType(keyOptions.label)==='bomb' && !keyOptions.disabled)
    )
    ? 'bomb' : 
    null

    const effectAnim : TargetType | null = hit ? hit.type : null;

    const zIndex = () => {
        return (
            (walkthroughPhase==='hit_target_v3' && (keyOptions.label.toLowerCase() === 'v' || keyOptions.label === '3')) 
            ||
            (walkthroughPhase==='bomb_u' && (keyOptions.label.toLowerCase() === 'u')) 
            ?
            10
            :
            'unset'
        )
    }

    return (
        <div className={`p-0.5 flex ${keyOptions.disabled ? "cursor-not-allowed" : "cursor-pointer"} `} style={{
                ...widthStyle,
                zIndex: zIndex(),
            }}>
            <button id={"key-"+keyOptions.label.toLowerCase()}
            className={`border-[0.5px] border-black rounded-md flex-center shadow-2xl theme-transition w-full cursor-[inherit] relative
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
                        { targetAnim && <TargetAnimation type={targetAnim} /> }
                        { effectAnim && <EffectAnimation type={effectAnim} /> }
                    </div>
                    <HammerAnimation keyPress={keyPress}/>
            </button>
        </div>
    )
}