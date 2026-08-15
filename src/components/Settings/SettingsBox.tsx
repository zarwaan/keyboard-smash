import SectionBox from "./Section/SectionBox";
import SectionHeader from "./Section/SectionHeader";
import SectionBody from "./Section/SectionBody";
import SectionOption from "./Section/SectionOption";
import ThemeToggle from "./ThemeToggle/ThemeToggle";
import { useUIContext } from "@/providers/UIProvider";
import { AnimatePresence, motion } from "motion/react";
import GameModeDropdown from "./Dropdowns/GameModeDropdown";
import DifficultyDropdown from "./Dropdowns/DifficultyDropdown";
import { useEffect } from "react";

export default function SettingsBox() {
    const {isSettingsOpen, closeSettings} = useUIContext();
    useEffect(() => {
        if (!isSettingsOpen) return;

        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") {
                closeSettings();
            }
        }

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isSettingsOpen, closeSettings]);
    return (
        <AnimatePresence>
        {    
            isSettingsOpen && 
            <motion.div className="border-0.5 absolute left-1/2 -translate-x-1/2 -top-20 w-1/2 m-auto text-(--text-color) border bg-(--bg-color) rounded-xl z-10 flex flex-col p-4 theme-transition gap-1"
                initial={{opacity: 0, y: 0}}
                animate={{opacity: 1, y: "120px"}}
                exit={{opacity: 0, y:0}}
                transition={{
                    duration: 0.4
                }}
            >
                <div className="text-xl w-[calc(100%+32px)] -ml-4 -mt-2 font-bold bordr border-green-500
                                border-b-x pb-x">
                    Game Options
                </div>
                <div className="section-boxes flex flex-col gap-2 bordr border-yellow-500">
                    <SectionBox>
                        <SectionHeader title="Appearance" />
                        <SectionBody>
                            <SectionOption>
                                <span>Dark mode</span>
                                <ThemeToggle />
                            </SectionOption>
                        </SectionBody>
                    </SectionBox>
                    <SectionBox>
                        <SectionHeader title="Game mechanics" />
                        <SectionBody>
                            <SectionOption>
                                <span>Play mode</span>
                                <GameModeDropdown z={-1}/>
                            </SectionOption>
                            <SectionOption>
                                <span>Difficulty Level</span>
                                <DifficultyDropdown z={-2} />
                            </SectionOption>
                        </SectionBody>
                    </SectionBox>
                </div>
                <div className="bordr -mb-2">
                    <button className="px-4 py-1 rounded-full bg-indigo-600 text-(--full-white) text-lg shadow-xl cursor-pointer"
                    onClick={closeSettings}>
                        Done
                    </button>
                </div>
            </motion.div>
        }
        </AnimatePresence>
    )
}