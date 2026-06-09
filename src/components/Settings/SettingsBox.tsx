import SectionBox from "./Section/SectionBox";
import SectionHeader from "./Section/SectionHeader";
import SectionBody from "./Section/SectionBody";
import SectionOption from "./Section/SectionOption";
import ThemeToggle from "./ThemeToggle/ThemeToggle";
import { useUIContext } from "@/providers/UIProvider";
import PlayToggle from "./ThemeToggle/PlayToggle";
import { AnimatePresence, motion } from "motion/react";

export default function SettingsBox() {
    const {isSettingsOpen, closeSettings} = useUIContext();
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
                            <SectionOption>
                                <span>Setting 2</span>
                                <PlayToggle />
                            </SectionOption>
                            <SectionOption>
                                <span>Setting 3</span>
                                <PlayToggle />
                            </SectionOption>
                            <SectionOption>
                                <span>Setting 4</span>
                                <PlayToggle />
                            </SectionOption>
                        </SectionBody>
                    </SectionBox>
                    <SectionBox>
                        <SectionHeader title="Game mechanics" />
                        <SectionBody>
                            <SectionOption>
                                <span>Dark mode</span>
                                <PlayToggle />
                            </SectionOption>
                            <SectionOption>
                                <span>Setting 2</span>
                                <PlayToggle />
                            </SectionOption>
                            <SectionOption>
                                <span>Setting 3</span>
                                <PlayToggle />
                            </SectionOption>
                            <SectionOption>
                                <span>Setting 4</span>
                                <PlayToggle />
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