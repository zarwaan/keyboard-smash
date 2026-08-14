import { createContext, useContext, useEffect, useState } from "react";

export interface GameSettings {
    targetInterval : number ;
    timeActive : number ;
    bombProbability : number ;
    includeSpecialKeys : boolean ;
    playMode : "lives" | "infinite" ;
    difficulty : "easy" | "medium" | "hard" | "impossible" | "incr"
    setTargetInterval: (n: number) => void ;
    setTimeActive: (n: number) => void ;
    setBombProbability: (n: number) => void ;
    setIncludeSpecialKeys: (b: boolean) => void ;
    setPlayMode : (s: "lives" | "infinite") => void ;
    setDifficulty : (_ : "easy" | "medium" | "hard" | "impossible" | "incr") => void
}

const GameSettingsContext = createContext<GameSettings>({
    targetInterval: 2000,
    timeActive: 2000,
    bombProbability: 0.2,
    includeSpecialKeys: true,
    playMode: "lives",
    difficulty: "easy",
    setTargetInterval: () => {},
    setTimeActive: () => {},
    setBombProbability: () => {},
    setIncludeSpecialKeys: () => {},
    setPlayMode: () => {},
    setDifficulty: () => {}
})

export default function GameSettingsProvider({children} : {children: React.ReactNode}) {
    const [targetInterval, setTargetInterval] = useState(600);
    const [timeActive, setTimeActive] = useState(1500);
    const [bombProbability, setBombProbability] = useState(0.4);
    const [includeSpecialKeys, setIncludeSpecialKeys] = useState(true);
    const [playMode, setPlayMode] = useState<GameSettings['playMode']>("lives");
    const [difficulty, setDifficulty] = useState<GameSettings['difficulty']>("easy");

    useEffect(() => {
        console.log(playMode);
        console.log(difficulty);
    }, [playMode, difficulty]);

    return (
        <GameSettingsContext.Provider value={{
            targetInterval, timeActive, bombProbability, includeSpecialKeys, playMode, difficulty,
            setBombProbability, setTargetInterval, setIncludeSpecialKeys, setTimeActive, setPlayMode, setDifficulty
        }}>
            {children}
        </GameSettingsContext.Provider>
    )
}

export function useGameSettingsContext(){
    return useContext(GameSettingsContext);
}