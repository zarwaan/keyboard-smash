import { useUIContext } from "@/providers/UIProvider";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import type { TargetType } from "@/state/GameReducer";
import dig from '@/assets/images/targets/diglett.webm';
import bomb from '@/assets/images/targets/bomb.webm';
import shield from '@/assets/images/targets/shield.webm';
import life from '@/assets/images/targets/life.webm';
import thor from '@/assets/images/targets/thor.webm'
import SectionBox from "@/components/Settings/Section/SectionBox";
import SectionHeader from "@/components/Settings/Section/SectionHeader";

const TargetDesc = (config : {src: string, desc: string, label: string, className: string}) => {
    return(
        <div className=" flex flex-row gap-9 w-full">
            <div className="w-8/100  border-blue-300 flex flex-col gap-1">
                <div className="flex flex-center">
                    <video autoPlay loop muted playsInline className={config.className}>
                        <source src={config.src} type="video/webm" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="w-full text-sm font-semibold">
                    {config.label}
                </div>
            </div>
            <div className="grow flex justify-start items-center font-semibold text-xl">
                {config.desc}
            </div>
        </div>
    )
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

    const configs : Record<TargetType, {src: string, desc: string, label: string, className: string}> = {
        target: {
            src: dig,
            desc: 'Smash your keyboard to hit! Missing one costs you a life',
            label: "Target",
            className: 'w-[90%]'
        },
        bomb: {
            src: bomb,
            desc: 'Avoid the bombs, they cost you two lives!',
            label: "Bomb",
            className: 'w-[65%]'
        },
        shield: {
            src: shield,
            desc: 'A 10 second immunity from all misses and bombs',
            label: "Shield",
            className: 'w-[75%]'
        },
        life: {
            src: life,
            desc: 'Adds one life',
            label: "Extra life",
            className: 'w-[85%]'
        },
        fireAll: {
            src: thor,
            desc: 'Engages all keys and activates a shield for 10 seconds',
            label: "Thor's hammer",
            className: 'w-[85%]'
        }
    }

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
                    <SectionBox>
                        <SectionHeader title="Target" />
                        <div className="flex flex-col gap-1 mt-2">
                            <TargetDesc {...configs.target} />
                        </div>
                    </SectionBox>
                    <SectionBox>
                        <SectionHeader title="Bomb" />
                        <div className="flex flex-col gap-1 mt-2">
                            <TargetDesc {...configs.bomb} />
                        </div>
                    </SectionBox>
                    <SectionBox>
                        <SectionHeader title="Power Ups" />
                        <div className="flex flex-col gap-2 mt-2">
                            <TargetDesc {...configs.shield} />
                            <TargetDesc {...configs.life} />
                            <TargetDesc {...configs.fireAll} />
                        </div>
                    </SectionBox>
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