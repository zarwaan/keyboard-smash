import { AUDIO_TRACKS } from "@/configs/sounds.configs";
import useAudioPool, { type AudioController } from "@/hooks/useAudioPool"
import { createContext, useContext } from "react"

type GameAudios = Record<keyof typeof AUDIO_TRACKS,AudioController>;

interface GameAudiosContextType {
    gameAudios: GameAudios
}

const GameAudiosContext = createContext<GameAudiosContextType>({} as GameAudiosContextType);

export default function SoundProvider({children} : {children: React.ReactNode}) {
    const gameAudios = {} as GameAudios;

    (Object.keys(AUDIO_TRACKS) as (keyof typeof AUDIO_TRACKS)[]).forEach((at) => {
        gameAudios[at] = useAudioPool(at)
    })

    return (
        <GameAudiosContext.Provider value={{
            gameAudios
        }}>
            {children}
        </GameAudiosContext.Provider>
    )
}

export function useSoundContext(){
    return useContext(GameAudiosContext)
}