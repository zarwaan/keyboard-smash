import { createContext, useContext, useState } from "react";

interface GameSettings {
    targetInterval : number ;
    timeActive : number ;
    bombProbability : number ;
    includeSpecialKeys : boolean ;
    setTargetInterval: (n: number) => void ;
    setTimeActive: (n: number) => void ;
    setBombProbability: (n: number) => void ;
    setIncludeSpecialKeys: (b: boolean) => void ;
}

const GameSettingsContext = createContext<GameSettings>({
    targetInterval: 2000,
    timeActive: 2000,
    bombProbability: 0.2,
    includeSpecialKeys: true,
    setTargetInterval: () => {},
    setTimeActive: () => {},
    setBombProbability: () => {},
    setIncludeSpecialKeys: () => {} 
})

export default function GameSettingsProvider({children} : {children: React.ReactNode}) {
    const [targetInterval, setTargetInterval] = useState(600);
    const [timeActive, setTimeActive] = useState(1500);
    const [bombProbability, setBombProbability] = useState(0.4);
    const [includeSpecialKeys, setIncludeSpecialKeys] = useState(true);

    return (
        <GameSettingsContext.Provider value={{
            targetInterval, timeActive, bombProbability, includeSpecialKeys,
            setBombProbability, setTargetInterval, setIncludeSpecialKeys, setTimeActive
        }}>
            {children}
        </GameSettingsContext.Provider>
    )
}

export function useGameSettingsContext(){
    return useContext(GameSettingsContext);
}