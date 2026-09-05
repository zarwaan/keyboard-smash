import { useUIContext } from "@/providers/UIProvider";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import SectionBox from "@/components/Settings/Section/SectionBox";
import SectionHeader from "@/components/Settings/Section/SectionHeader";
import type { TargetKind, TargetType } from "@/types/targets.type";
import { TARGETS } from "@/configs/targets.config";
import { getTargetKeysByCondition } from "@/utils/getTargetKeysByCondition";

const TargetDesc = ({targetName} : {targetName: TargetType}) => {
    const config = TARGETS[targetName];
    return(
        <div className=" flex flex-row gap-9 w-full">
            <div className="w-8/100  border-blue-300 flex flex-col gap-1">
                <div className="flex flex-center">
                    <video autoPlay loop muted playsInline className={config.desc.className}>
                        <source src={config.animation.targeting.src} type="video/webm" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="w-full text-sm font-semibold">
                    {config.label}
                </div>
            </div>
            <div className="grow flex justify-start items-center font-semibold text-xl">
                {config.desc.text}
            </div>
        </div>
    )
}

function getArrayOfTargetKind(tk: TargetKind) {
    return getTargetKeysByCondition(t => TARGETS[t].kind===tk)
}

export default function InstructionBox2() {
    const {isInstructionOpen, closeInstruction, setWalkthroughPhase} = useUIContext();
    useEffect(() => {
        if (!isInstructionOpen) return;

        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") {
                closeInstruction();
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isInstructionOpen, closeInstruction]);

    return (
        <AnimatePresence>
        {    
            isInstructionOpen && 
            <motion.div className="border-0.5 absolute left-1/2 -translate-x-1/2 -top-20 m-auto text-(--text-color) border bg-(--bg-color) rounded-xl z-10 flex flex-col px-10 py-4 theme-transition gap-2"
                initial={{opacity: 0, y: 0}}
                animate={{opacity: 1, y: "120px"}}
                exit={{opacity: 0, y:0}}
                transition={{
                    duration: 0.4
                }}
            >
                <div className="text-2xl font-bold borde border-green-500">
                    Instructions
                </div>
                <div className=" border-red-500 flex flex-col gap-3">
                    {
                        [
                            ...new Set(
                                (Object.keys(TARGETS) as TargetType[])
                                    .map((tt) => {
                                        return TARGETS[tt].kind;
                                    }
                                )
                            )
                        ]
                        .map(tk => (
                            <SectionBox>
                                <SectionHeader title={tk.slice(0,1).toUpperCase() + tk.slice(1) + " keys"} />
                                <div className="flex flex-col gap-2 mt-2">
                                    {
                                        getArrayOfTargetKind(tk).map(tt => <TargetDesc targetName={tt} />)
                                    }
                                </div>
                            </SectionBox>
                        ))
                    }
                </div>
                <div>
                    <button className="px-4 py-1 rounded-full bg-green-800 text-(--full-white) text-lg shadow-xl cursor-pointer m-2"
                    onClick={() =>{
                        closeInstruction();
                        setWalkthroughPhase('instructions')
                    }}>
                        Restart Tutorial
                    </button>
                </div>
                <div>
                    <button className="px-4 py-1 rounded-full bg-indigo-600 text-(--full-white) text-lg shadow-xl cursor-pointer"
                    onClick={closeInstruction}>
                        Done
                    </button>
                </div>
            </motion.div>
        }
        </AnimatePresence>
    )
}