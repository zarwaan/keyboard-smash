import { createContext, useContext, useEffect, useState } from "react"

interface GameState {
    pressedKeys : Set<string>;
    isPressed: (keyValue: string) => boolean;
}

const GameContext = createContext<GameState>({
    pressedKeys: new Set<string>(),
    isPressed: () => false

})

export default function GameProvider({children} : {children: React.ReactNode}) {
    const [pressedKeys, setPressedKeys] = useState(new Set<string>);

    const isPressed = (keyValue: string) => pressedKeys.has(keyValue.toLowerCase())
    
    const getNameOfKey = (e: KeyboardEvent) : string => {
        const disabledKeys = ['control', 'alt', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright']
        if(e.key.toLowerCase() === "shift") return e.code.toLowerCase();
        if(e.code.toLowerCase() === "metaleft" || e.key.toLowerCase() === 'capslock') return 'caps lock'
        if(disabledKeys.includes(e.key.toLowerCase())) return ""
        return e.key.toLowerCase()
    }

    function handleKeyDown(e: KeyboardEvent){
        e.preventDefault();
        if(e.repeat) return
        let key = getNameOfKey(e);
        if(key)
            setPressedKeys(prev => {
                const next = new Set(prev);
                next.add(getNameOfKey(e));
                return next;
            })
    }

    function handleKeyUp(e: KeyboardEvent) {
        let key = getNameOfKey(e);
        if(key)
            setPressedKeys(prev => {
                const next = new Set(prev);
                next.delete(getNameOfKey(e));
                return next;
            });
    }
    
    useEffect(() => console.log(pressedKeys),[pressedKeys]);

    useEffect(() => {
        window.addEventListener('keydown',handleKeyDown);
        window.addEventListener('keyup',handleKeyUp);
        return () => {
            window.removeEventListener('keydown',handleKeyDown);
            window.removeEventListener('keyup',handleKeyUp);
        }
    }, [])

    return (
        <GameContext.Provider value={{
            pressedKeys, isPressed
        }}>
            {children}
        </GameContext.Provider>
    )
}

export function useGameContext() {
    return useContext(GameContext)
}