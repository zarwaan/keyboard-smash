import { useUIContext } from "@/providers/UIProvider";
import { AnimatePresence, motion } from "motion/react";
import NavBar from "./Nav/NavBar";
import AuthNavProvider from "./AuthBoxProvider";
import { useEffect } from "react";
import Panel from "./panels/Panel";

export default function AuthBox({}) {
    const {isAuthOpen, closeAuth} = useUIContext();
    useEffect(() => {
            if (!isAuthOpen) return;
    
            function handleKeyDown(e: KeyboardEvent) {
                if (e.key === "Escape") {
                    closeAuth();
                }
            }
    
            window.addEventListener("keydown", handleKeyDown);
    
            return () => {
                window.removeEventListener("keydown", handleKeyDown);
            };
        }, [isAuthOpen, closeAuth]);
    return (
        <AuthNavProvider>
            <AnimatePresence>
                {
                    isAuthOpen &&
                    <motion.div className="border-0.5 absolute left-1/2 -translate-x-1/2 -top-20 m-auto text-(--text-color) border bg-(--bg-color) rounded-xl z-11 flex flex-col px-10 py-4 theme-transition gap-2 w-3/10"
                        initial={{opacity: 0, y: 0}}
                        animate={{opacity: 1, y: "120px"}}
                        exit={{opacity: 0, y:0}}
                        transition={{
                            duration: 0.4
                        }}
                    >
                        <NavBar />
                        <Panel />
                    </motion.div>
                }
            </AnimatePresence>
        </AuthNavProvider>
    )
}