import { QwertyRows } from "@/configs/keys.config";
import { createContext, useContext, useEffect, useState } from "react"

interface GameState {
    pressedKeys : Set<string>;
    isPressed: (keyValue: string) => boolean;
    targetKeys : Set<string>;
    isTarget : (keyValeu: string) => boolean;
}

const GameContext = createContext<GameState>({
    pressedKeys: new Set<string>(),
    isPressed: () => false,
    targetKeys : new Set<string>,
    isTarget : () => false,
})

export default function GameProvider({children} : {children: React.ReactNode}) {
    const [pressedKeys, setPressedKeys] = useState(new Set<string>);

    const isPressed = (keyValue: string) => pressedKeys.has(keyValue.toLowerCase())

    const [targetKeys, setTargetKeys] = useState(new Set<string>);

    const isTarget = (keyValue: string) => targetKeys.has(keyValue.toLowerCase())
    
    const getNameOfKey = (e: KeyboardEvent) : string => {
        const disabledKeys = ['control', 'alt', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright']
        if(e.key.toLowerCase() === "shift") return e.code.toLowerCase();
        if(e.code.toLowerCase() === "metaleft" || e.key.toLowerCase() === 'capslock') return 'caps lock'
        if(e.code.toLowerCase() === "backquote") return '`'
        if(disabledKeys.includes(e.key.toLowerCase())) return ""
        return e.key.toLowerCase()
    }

    function handleKeyDown(e: KeyboardEvent){
        if(getNameOfKey(e)==='tab') e.preventDefault();
        if(e.repeat) return
        let key = getNameOfKey(e);
        if(key)
            setPressedKeys(prev => {
                const next = new Set(prev);
                next.add(getNameOfKey(e));
                return next;
            })

        if(key === 'caps lock')
            setTimeout(() => {
                setPressedKeys(prev => {
                    const next = new Set(prev);
                    next.delete('caps lock');
                    return next;
                });
            }, 150);
    }

    function handleKeyUp(e: KeyboardEvent) {
        let key = getNameOfKey(e);
        if(key)
            setPressedKeys(prev => {
                const next = new Set(prev);
                next.delete(key);
                return next;
            });
    }

    function getRandomNumber(max:number){
        return Math.floor(Math.random() * max);
    }

    function generateTargets(interval?: number, timeActive?: number, includeSpecialKeys: boolean = true){
        const activeRows = [
            QwertyRows[1], QwertyRows[2], QwertyRows[3], QwertyRows[4], 
        ]

        let i = getRandomNumber(activeRows.length);
        let j = getRandomNumber(activeRows[i].length);

        setTargetKeys(prev => {
            const next = new Set(prev);
            next.add(activeRows[i][j].toLowerCase());
            return next;
        })

        setTimeout(() => {
            setTargetKeys(prev => {
                const next = new Set(prev);
                next.delete(activeRows[i][j].toLowerCase());
                return next;
            })
        }, 1000)
    }
    
    useEffect(() => console.log(pressedKeys),[pressedKeys]);
    useEffect(() => console.log(targetKeys),[targetKeys]);

    useEffect(() => {
        window.addEventListener('keydown',handleKeyDown);
        window.addEventListener('keyup',handleKeyUp);

        // start game
        const intervalId = setInterval(() => {generateTargets()},  1000)

        return () => {
            window.removeEventListener('keydown',handleKeyDown);
            window.removeEventListener('keyup',handleKeyUp);
            clearInterval(intervalId);
        }
    }, [])

    return (
        <GameContext.Provider value={{
            pressedKeys, isPressed, targetKeys, isTarget
        }}>
            {children}
        </GameContext.Provider>
    )
}

export function useGameContext() {
    return useContext(GameContext)
}