import { useUIContext } from "@/providers/UIProvider";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import InstructionCarousel from "./InstructionCarousel";

export default function InstructionBox() {
    const {isInstructionOpen, closeInstruction} = useUIContext();
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
            <motion.div className="border-0.5 absolute left-1/2 -translate-x-1/2 -top-20 w-7/10 m-auto text-(--text-color) border bg-(--bg-color) rounded-xl z-10 flex flex-col px-10 py-4 theme-transition gap-1"
                initial={{opacity: 0, y: 0}}
                animate={{opacity: 1, y: "120px"}}
                exit={{opacity: 0, y:0}}
                transition={{
                    duration: 0.4
                }}
            >
                <div className="text-2xl w-[calc(100%+32px)] -ml-4 font-bold bordr border-green-500
                                border-b-x pb-x">
                    How to play
                </div>
                <InstructionCarousel />
                <div className="bordr">
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