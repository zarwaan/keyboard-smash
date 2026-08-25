import useAudioPool, { type AudioController } from "@/hooks/useAudioPool"
import { createContext, useContext } from "react"

interface GameAudios {
    bgMusic: AudioController
    hitEffect: AudioController,
    missEffect: AudioController,
    bombEffect: AudioController,
    gameOverEffect: AudioController
}

const GameAudiosContext = createContext<GameAudios>({} as GameAudios);

export default function SoundProvider({children} : {children: React.ReactNode}) {
    const bgMusic = useAudioPool("bg");
    const hitEffect = useAudioPool("hit");
    const missEffect = useAudioPool("miss");
    const bombEffect = useAudioPool("bomb");
    const gameOverEffect = useAudioPool("game_over");
    return (
        <GameAudiosContext.Provider value={{
            bgMusic, hitEffect, missEffect, bombEffect, gameOverEffect
        }}>
            {children}
        </GameAudiosContext.Provider>
    )
}

export function useSoundContext(){
    return useContext(GameAudiosContext)
}