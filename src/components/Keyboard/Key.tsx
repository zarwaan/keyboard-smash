import { useGameContext } from "@/providers/GameProvider";
import type { keyType } from "@/types/key.type";
import { useUIContext } from "@/providers/UIProvider";
import HammerAnimation from "../Animations/HammerAnimation";
import { motion } from "motion/react";
import KeyAnimation from "../Animations/KeyAnimation";
import { TARGETS } from "@/configs/targets.config";
import { getTargetKeysByCondition } from "@/utils/getTargetKeysByCondition";
import type { TargetType } from "@/types/targets.type";

export default function Key({ keyOptions }: { keyOptions: keyType }) {
    const widthStyle = keyOptions.length ? { width: keyOptions.length } : {flexGrow : 1};
    const {isPressed, getTargetType, hitEvent, powerUps} = useGameContext();
    const {walkthroughPhase} = useUIContext();

    const shieldUp = powerUps.shield.active;

    const hit = keyOptions.disabled ? undefined : hitEvent(keyOptions.label)
    const keyPress = isPressed(keyOptions.label) && !keyOptions.disabled;

    const isTarget = (t: TargetType) => getTargetType(keyOptions.label)===t && !keyOptions.disabled

    const targetAnim = getTargetKeysByCondition(t => (
        (
            TARGETS[t].walkthrough.phase === walkthroughPhase 
            && 
            (TARGETS[t].walkthrough.keyLabels as string[]).includes(keyOptions.label.toLowerCase())
        )
        ||
        isTarget(t)
    )).at(0) ?? null;

    const effectAnim : TargetType | null = hit ? hit.type : null;

    const zIndex = () => {
        return (
            targetAnim && walkthroughPhase!=="$$OVER$$"
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
            <motion.button id={"key-"+keyOptions.label.toLowerCase()}
            className={`border-[0.5px] border-black rounded-md shadow-2xl flex-center theme-transition w-full cursor-[inherit] relative
                
                ${
                    keyOptions.disabled ?
                    "bg-(--key-bg-color-disabled) text-(--key-text-color-disabled) shadow-2xl! border-[0.5px]!" :
                    "bg-(--key-color) text-(--key-text-color)"
                }
                `} 
                initial={{
                    boxShadow: shieldUp ? "inset 0px 0px 2px 2px var(--color-sky-600)" : 'initial',
                    borderWidth: shieldUp ? "0px" : '0.5px'
                }}
                animate={{
                    boxShadow: shieldUp ? "inset 0px 0px 5px 2px var(--color-sky-600)" : "initial"
                }}
                transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut"
                }}
                >
                {
                    keyOptions.label === "space" ? "" :
                    keyOptions.label === "Blank" ? "⏻" :
                    (keyOptions.label === "shiftleft" || keyOptions.label === "shiftright") ? "shift" :
                    keyOptions.label
                }
                    <div className="borde border-red-500 aspect-square absolute max-h-full flex-center">
                        { targetAnim && <KeyAnimation targetName={targetAnim} animationKind="targeting" /> }
                        { effectAnim && <KeyAnimation targetName={effectAnim} animationKind="effect" /> }
                    </div>
                    <HammerAnimation keyPress={keyPress}/>
            </motion.button>
        </div>
    )
}