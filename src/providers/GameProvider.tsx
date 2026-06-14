import { QwertyRows } from "@/configs/keys.config";
import { createContext, useContext, useEffect, useRef, useState } from "react"

interface GameState {
    pressedKeys : Set<string>;
    isPressed: (keyValue: string) => boolean;
    targetKeys : Set<string>;
    isTarget : (keyValeu: string) => boolean;
    gameState : 'ongoing' | 'stopped';
    isPaused : boolean ;
    startGame : () => void ;
    stopGame : () => void ;
    pauseGame : () => void ;
    resumeGame : () => void ;
}

const GameContext = createContext<GameState>({
    pressedKeys: new Set<string>(),
    isPressed: () => false,
    targetKeys : new Set<string>,
    isTarget : () => false,
    gameState : 'stopped',
    isPaused : false,
    startGame : () => {},
    stopGame : () => {},
    pauseGame : () => {},
    resumeGame : () => {},
})

export default function GameProvider({children} : {children: React.ReactNode}) {
    
    const [pressedKeys, setPressedKeys] = useState(new Set<string>);
    const isPressed = (keyValue: string) => pressedKeys.has(keyValue.toLowerCase())
    
    const [targetKeys, setTargetKeys] = useState(new Set<string>);
    const isTarget = (keyValue: string) => targetKeys.has(keyValue.toLowerCase())
    
    // move to game settings provider
    const interval = 300;
    const timeActive = 1000;
    const includeSpecialKeys = true

    const intervalId = useRef<number>(null);
    const [gameState, setGameState] = useState<GameState['gameState']>('stopped');
    const [isPaused, setIsPaused] = useState(false);
    const isPausedRef = useRef(false);

    const startGame = () => {
        setGameState('ongoing');
    }

    const stopGame = () => {
        setGameState('stopped')
        isPausedRef.current = false;
        setIsPaused(false)
    }

    const pauseGame = () => {
        if(intervalId.current){
            isPausedRef.current = true;
            setIsPaused(true)
        }
    }

    const resumeGame = () => {
        if(intervalId.current){
            isPausedRef.current = false;
            setIsPaused(false);
        }
    }
    
    const getNameOfKey = (e: KeyboardEvent) : string => {
        const disabledKeys = ['control', 'alt', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright']
        if(e.key.toLowerCase() === "shift") return e.code.toLowerCase();
        if(e.code.toLowerCase() === "metaleft" || e.key.toLowerCase() === 'capslock') return 'caps lock'
        if(e.code.toLowerCase() === "backquote") return '`'
        if(disabledKeys.includes(e.key.toLowerCase())) return ""
        return e.key.toLowerCase()
    }

    function handleKeyDown(e: KeyboardEvent){
        if(isPausedRef.current) return;
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
        if(isPausedRef.current) return;
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

    function generateTargets(){
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

        // setTimeout(() => {
        //     setTargetKeys(prev => {
        //         const next = new Set(prev);
        //         next.delete(activeRows[i][j].toLowerCase());
        //         return next;
        //     })
        // }, timeActive)

        //trying something
        function removeWhenUnpaused(key: string) {
            if (isPausedRef.current) {
                setTimeout(() => removeWhenUnpaused(key), 100);
                return;
            }

            setTargetKeys(prev => {
                const next = new Set(prev);
                next.delete(key);
                return next;
            });
        }
        
        setTimeout(() => removeWhenUnpaused(activeRows[i][j].toLowerCase()),timeActive);
    }

    // useEffect(() => console.log(pressedKeys),[pressedKeys]);
    // useEffect(() => console.log(targetKeys),[targetKeys]);

    useEffect(() => {
        window.addEventListener('keydown',handleKeyDown);
        window.addEventListener('keyup',handleKeyUp);

        return () => {
            window.removeEventListener('keydown',handleKeyDown);
            window.removeEventListener('keyup',handleKeyUp);
        }
    }, [])

    useEffect(() => {
        if(gameState === 'ongoing'){
            intervalId.current = window.setInterval(() => {
                if(!isPausedRef.current)
                    generateTargets()
                    // console.log(i++);
            }, interval);
        }
        else{
            if(intervalId.current) {
                clearInterval(intervalId.current)
                intervalId.current = null
            }
        }

        return () => {if(intervalId.current) clearInterval(intervalId.current)};
    },[gameState])

    return (
        <GameContext.Provider value={{
            pressedKeys, isPressed, targetKeys, isTarget, 
            gameState,isPaused,startGame,stopGame,pauseGame,resumeGame,
        }}>
            {children}
        </GameContext.Provider>
    )
}

export function useGameContext() {
    return useContext(GameContext)
}