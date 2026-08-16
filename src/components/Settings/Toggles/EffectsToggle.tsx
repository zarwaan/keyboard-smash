import Toggle from "@/components/Utils/Toggle";
import { useUIContext } from "@/providers/UIProvider";

export default function EffectsToggle({}) {
    const {areEffectsMuted, muteEffects, unmuteEffects} = useUIContext();
    return (
        <div className="w-7/100 bordr border-red-400 flex flex-center">
            <Toggle 
                toggleOnState={() => {
                    unmuteEffects()
                }}
                toggleOffState={() => {
                    muteEffects()
                }}
                isAlreadyOn={!areEffectsMuted}
            />
        </div>
    )
}