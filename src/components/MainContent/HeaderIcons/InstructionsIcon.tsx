import { useUIContext } from "@/providers/UIProvider"

export default function InstructionsIcon({}) {
    const {openInstruction, walkthroughPhase} = useUIContext();
    return (
        <button id="instructions-icon" className="border border-(--text-color) bg-indigo-500 p-1 rounded-xl shadow-[3px_3px_0px_var(--text-color)] transform-translate duration-100 ease-in-out
                            active:translate-0.5 active:shadow-none cursor-pointer w-12 h-12 text-(--full-white)"
                style={{
                    zIndex: walkthroughPhase==='instructions' ? 10 : 'unset'
                }}
                onClick={openInstruction}
        >
                <div className="line-clamp-none text-[35px] flex-center w-[125%] h-[115%] font-light hover:animate-[move-x_2s_linear_infinite]">
                    ?
                </div>
        </button>
    )
}