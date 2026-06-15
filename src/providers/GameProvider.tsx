import { QwertyRows } from "@/configs/keys.config";
import { createContext, useContext, useEffect, useRef, useState } from "react"

interface Target {
    key: string,
    expiresAt: number,
    isBomb: boolean
}

interface GameState {
    pressedKeys : Set<string>;
    isPressed: (keyValue: string) => boolean;
    targetKeys : Target[];
    isHitTarget : (keyValue: string) => boolean;
    isBomb : (keyValue: string) => boolean;
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
    targetKeys : [],
    isHitTarget : () => false,
    isBomb : () => false,
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
    
    const [targetKeys, setTargetKeys] = useState<Target[]>([]);
    const isHitTarget = (keyValue: string) => targetKeys.some(target => target.key.toLowerCase() === keyValue.toLowerCase() && !target.isBomb);
    const isBomb = (keyValue: string) => targetKeys.some(target => target.key.toLowerCase() === keyValue.toLowerCase() && target.isBomb);
    
    // move to game settings provider
    const interval = 300;
    const timeActive = 1000;
    const bombProbability = 0.2;
    // const includeSpecialKeys = true

    const intervalId = useRef<number>(null);
    const [gameState, setGameState] = useState<GameState['gameState']>('stopped');
    const [isPaused, setIsPaused] = useState(false);
    const isPausedRef = useRef(false);
    const pausedTimeRef = useRef(0);

    const startGame = () => {
        setGameState('ongoing');
    }

    const stopGame = () => {
        setGameState('stopped')
        isPausedRef.current = false;
        setIsPaused(false);
        setTargetKeys([]);
    }

    const pauseGame = () => {
        if(intervalId.current){
            isPausedRef.current = true;
            setIsPaused(true);
            pausedTimeRef.current = Date.now();
        }
    }

    const resumeGame = () => {
        const pausedDuration = Date.now() - pausedTimeRef.current;
        if(intervalId.current){
            isPausedRef.current = false;
            setIsPaused(false);
            setTargetKeys(prev => prev.map(target => ({...target, expiresAt : target.expiresAt + pausedDuration})))
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

    const activeRows = [
        QwertyRows[1], QwertyRows[2], QwertyRows[3], QwertyRows[4], 
    ]
        
    function generateTarget(){
        let i = getRandomNumber(activeRows.length);
        let j = getRandomNumber(activeRows[i].length);

        if(!targetKeys.some(target => target.key.toLowerCase() === activeRows[i][j].toLowerCase())){
            setTargetKeys(prev => 
                [
                    ...prev,
                    {
                        key: activeRows[i][j].toLowerCase(),
                        expiresAt: Date.now() + timeActive,
                        isBomb: Math.random() < bombProbability
                    }
                ]
            )
        }
        else generateTarget();
    }

    // useEffect(() => console.log(pressedKeys),[pressedKeys]);
    // useEffect(() => console.log(targetKeys),[targetKeys]);

    useEffect(() => {
        window.addEventListener('keydown',handleKeyDown);
        window.addEventListener('keyup',handleKeyUp);

        const cleanupInterval = window.setInterval(() => {
            if(isPausedRef.current) return;
            setTargetKeys(prev => prev.filter(target => target.expiresAt > Date.now()))
        },100)

        return () => {
            window.removeEventListener('keydown',handleKeyDown);
            window.removeEventListener('keyup',handleKeyUp);
            window.clearInterval(cleanupInterval);
        }
    }, [])

    useEffect(() => {
        if(gameState === 'ongoing'){
            intervalId.current = window.setInterval(() => {
                if(!isPausedRef.current){
                    generateTarget()
                }
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
            pressedKeys, isPressed, targetKeys, isHitTarget, isBomb,
            gameState,isPaused,startGame,stopGame,pauseGame,resumeGame,
        }}>
            {children}
        </GameContext.Provider>
    )
}

export function useGameContext() {
    return useContext(GameContext)
}