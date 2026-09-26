import { useUIContext } from "@/providers/UIProvider";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useGlobalAuthContext } from "@/providers/AuthProvider";
import useFetch from "@/hooks/useFetch";
import type { ILoginDetails } from "shared/types/auth.types";

export default function ProfileBox({}) {
    const {userDetails, logout} = useGlobalAuthContext();
    const {isProfileOpen, closeProfile, createToast} = useUIContext();

    const {data, loading, error, execute: logoutServer} = useFetch<ILoginDetails>('/auth/logout',{
        method: 'POST',
        credentials: 'include'
    });

    useEffect(() => {
        if(data)
        {
            logout();
            closeProfile();
            createToast({
                type: "SUCCESS",
                label: "Logged out successfully!"
            })
        }
    },[data])

    useEffect(() => {
        if(error)
            console.error(error)
    },[error])
    
    useEffect(() => {
        if (!isProfileOpen) return;
        
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") {
                closeProfile();
            }
        }
        
        window.addEventListener("keydown", handleKeyDown);
        
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isProfileOpen, closeProfile]);
    
    if(!userDetails) return null;

    return (
        <AnimatePresence>
        {    
            isProfileOpen && 
            <motion.div className="border-0.5 absolute left-1/2 -translate-x-1/2 -top-20 m-auto text-(--text-color) border bg-(--bg-color) rounded-xl z-11 flex flex-col px-10 py-4 theme-transition gap-3 w-3/10"
                initial={{opacity: 0, y: 0}}
                animate={{opacity: 1, y: "120px"}}
                exit={{opacity: 0, y:0}}
                transition={{
                    duration: 0.4
                }}
            >
                <div className="font-semibold font-(family-name:--header-font) text-indigo-600 tracking-[0.075em] text-4xl">
                    Hey {userDetails.username}!
                </div>
                <div className="w-full flex flex-row gap-3">
                    <span className="self-center">Email:</span>
                    <div className="grow">
                        <input type="text" value={userDetails.email || "Not provided"} 
                        className="italic bg-(--full-white) disabled:bg-gray-200 text-black rounded-xl px-3 py-1 outline-none! w-full text-md
                                    disabled:text-gray-700 border-[0.5px] border-black disabled:cursor-not-allowed" 
                        disabled/>
                    </div>
                </div>
                <div className="flex flex-center gap-5">
                    <button className="px-4 py-1 rounded-full bg-indigo-600 text-(--full-white) text-lg shadow-xl cursor-pointer"
                    onClick={closeProfile}>
                        Done
                    </button>
                    <button className="px-4 py-1 rounded-full bg-red-500 text-(--full-white) text-lg shadow-xl cursor-pointer
                    flex flex-center gap- w-32/100 gap-1" onClick={logoutServer} disabled={loading}>
                        {
                            !loading ?
                            <>
                            <div className="aspect-square w-2/10">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g> 
                                    <path d="M16 17L21 12M21 12L16 7M21 12H9M9 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H9" 
                                        stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    </path>
                                </g>
                                </svg>
                            </div>
                            <div className="w-8/10">
                                Log out
                            </div>
                            </>
                            :
                            <div>Logging out...</div>
                        }
                    </button>
                </div>
            </motion.div>
        }
        </AnimatePresence>
    )
}