import Toggle from "@/components/Utils/Toggle";
import { useUIContext } from "@/providers/UIProvider";

export default function MusicToggle({}) {
    const {isMusicMuted, muteMusic, unmuteMusic} = useUIContext();
    return (
        <div className="w-7/100 bordr border-red-400 flex flex-center">
            <Toggle 
                toggleOnState={() => {
                    unmuteMusic();
                }}
                toggleOffState={() => {
                    muteMusic();
                }}
                isAlreadyOn={!isMusicMuted}
            />
        </div>
    )
}