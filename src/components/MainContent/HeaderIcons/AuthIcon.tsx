import { useUIContext } from "@/providers/UIProvider"

export default function AuthIcon({}) {
    const {openAuth} = useUIContext();
    return (
        <button id="instructions-icon" className="border border-(--text-color) bg-indigo-500 p-1 rounded-xl shadow-[3px_3px_0px_var(--text-color)] transform-translate duration-100 ease-in-out
                            active:translate-0.5 active:shadow-none cursor-pointer w-12 h-12 text-(--full-white)"
                onClick={() => {
                    openAuth();
                }}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g> 
                        <path d="M14 4L17.5 4C20.5577 4 20.5 8 20.5 12C20.5 16 20.5577 20 17.5 20H14M15 12L3 12M15 12L11 16M15 12L11 8" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> 
                    </g>
                </svg>
        </button>
    )
}