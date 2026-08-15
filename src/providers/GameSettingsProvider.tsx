import { createContext, useContext, useState } from "react";

export interface GameSettings {
    includeSpecialKeys : boolean ;
    playMode : "lives" | "infinite" ;
    difficulty : "easy" | "medium" | "hard" | "impossible" | "incr"
    setIncludeSpecialKeys: (b: boolean) => void ;
    setPlayMode : (s: GameSettings['playMode']) => void ;
    setDifficulty : (_ : GameSettings['difficulty']) => void
}

const GameSettingsContext = createContext<GameSettings>({
    includeSpecialKeys: true,
    playMode: "lives",
    difficulty: "easy",
    setIncludeSpecialKeys: () => {},
    setPlayMode: () => {},
    setDifficulty: () => {}
})

export default function GameSettingsProvider({children} : {children: React.ReactNode}) {
    const [includeSpecialKeys, setIncludeSpecialKeys] = useState(true);
    const [playMode, setPlayMode] = useState<GameSettings['playMode']>("lives");
    const [difficulty, setDifficulty] = useState<GameSettings['difficulty']>("easy");

    return (
        <GameSettingsContext.Provider value={{
            includeSpecialKeys, playMode, difficulty,
            setIncludeSpecialKeys, setPlayMode, setDifficulty
        }}>
            {children}
        </GameSettingsContext.Provider>
    )
}

export function useGameSettingsContext(){
    return useContext(GameSettingsContext);
}