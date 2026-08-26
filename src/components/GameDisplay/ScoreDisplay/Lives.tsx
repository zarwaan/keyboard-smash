import heartPng from "@/assets/images/lives.png"
import { AnimatePresence, motion } from "motion/react";
import { useGameContext } from "@/providers/GameProvider";
import GameOverBox from "./GameOverBox";
import { useUIContext } from "@/providers/UIProvider";

export default function Lives({}) {
    const {score, gameId, isgameOver} = useGameContext();
    const {walkthroughPhase} = useUIContext();
    return (
        <div className="w-full p-1 flex flex-row gap-4 flex-center">
            <span className="flex flex-row gap-2" id="lives-display"
                style={{
                    zIndex: walkthroughPhase==='lives' ? 10 : 'unset'
                }}
            >
                {
                    !isgameOver
                    &&
                    <AnimatePresence>
                        {
                            Array.from({length: score.lives}).map((_, i) => 
                                <Life key={`life-${gameId}-${i}`} />
                            )
                        }
                    </AnimatePresence>
                }
                {
                    isgameOver
                    &&
                    <GameOverBox />
                }
            </span>
        </div>
    )
}

function Life({}) {
    return (
        <motion.div className=""
            initial={{scale: 1}}
            animate={{ scale: [1, 1.1, 1] }} 
            exit={{
                opacity: [1, 0, 1, 0, 1, 0],
                scale: [1, 0.8, 0.6, 0.4, 0.2, 0],
                // y: -20,
                y: [0, -4, -8, -12, -16, -20],
                // filter: "grayscale(100%)",
                transition: {
                    duration: 0.5,
                    ease: "linear"
                }
            }}
            transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatType: "reverse", // Smooth back-and-forth scaling
                ease: "easeInOut"
            }}
        >
            <img src={heartPng} width={50} 
                className="filter drop-shadow-[3px_2px_3px_#fff] drop-shadow-gray-400/60"
            />
        </motion.div>
    )
}