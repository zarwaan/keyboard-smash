import { QwertyRows } from "@/configs/keys.config";
import { createContext, useContext, useEffect, useRef, useState } from "react"
import { useGameSettingsContext } from "./GameSettingsProvider";
import { difficulties } from "@/configs/difficulties.config";

interface Target {
    key: string,
    expiresAt: number,
    isBomb: boolean
}

interface Score {
    targetsHit: number;
    targetsMissed: number;
    bombsHit: number;
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
    score : Score;
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
    score : {targetsHit: 0, bombsHit: 0, targetsMissed: 0},
})

export default function GameProvider({children} : {children: React.ReactNode}) {

    const { difficulty } = useGameSettingsContext();
    const { targetInterval, timeActive, bombProbability} = difficulties[difficulty];

    const [pressedKeys, setPressedKeys] = useState(new Set<string>);
    const isPressed = (keyValue: string) => pressedKeys.has(keyValue.toLowerCase())
    
    const [targetKeys, setTargetKeys] = useState<Target[]>([]);
    const isHitTarget = (keyValue: string) => targetKeys.some(target => target.key.toLowerCase() === keyValue.toLowerCase() && !target.isBomb);
    const isBomb = (keyValue: string) => targetKeys.some(target => target.key.toLowerCase() === keyValue.toLowerCase() && target.isBomb);
    const [score, setScore] = useState<Score>({targetsHit:0, bombsHit: 0, targetsMissed: 0});

    const intervalId = useRef<number>(null);
    const [gameState, setGameState] = useState<GameState['gameState']>('stopped');
    const [isPaused, setIsPaused] = useState(false);
    const isPausedRef = useRef(false);
    const pausedTimeRef = useRef(0);
    const missedTargetsRef = useRef(0);

    const resetGame = () => {
        setPressedKeys(new Set<string>);
        setTargetKeys([]);
        setScore({targetsHit:0, bombsHit: 0, targetsMissed: 0});
        missedTargetsRef.current=0;
    }

    const startGame = () => {
        resetGame();
        setGameState('ongoing');
    }

    const stopGame = () => {
        setGameState('stopped')
        isPausedRef.current = false;
        setIsPaused(false);
        setTargetKeys([]);
        setScore({targetsHit:0, bombsHit: 0, targetsMissed: 0});
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
    const allKeys = activeRows.flat().map(key => key.toLowerCase());

    function generateTarget() {
        setTargetKeys(prev => {
            const occupied = new Set(
                prev.map(target => target.key)
            );

            const availableKeys = allKeys.filter(
                key => !occupied.has(key)
            );

            if (availableKeys.length === 0)
                return prev;

            const key =
                availableKeys[
                    getRandomNumber(availableKeys.length)
                ];

            return [
                ...prev,
                {
                    key,
                    expiresAt: Date.now() + timeActive,
                    isBomb: Math.random() < bombProbability
                }
            ];
        });
    }

    useEffect(() => {
        let hit = targetKeys.find(target => pressedKeys.has(target.key.toLowerCase())); 
        if(hit){
            if(!hit.isBomb)
                setScore(prev => ({
                    ...prev,
                    targetsHit: prev.targetsHit+1
                }))
            else
                setScore(prev => ({
                    ...prev,
                    bombsHit: prev.bombsHit+1
                }))
            setTargetKeys(prev => prev.filter(target => target.key !== hit.key))
        }
    },[pressedKeys])

    useEffect(() => {
        window.addEventListener('keydown',handleKeyDown);
        window.addEventListener('keyup',handleKeyUp);

        const cleanupInterval = window.setInterval(() => {
            if (isPausedRef.current) return;

            setTargetKeys(prev => {
                const missedTargets = prev.filter(
                    target => target.expiresAt <= Date.now() && !target.isBomb
                );

                missedTargetsRef.current = missedTargets.length;

                return prev.filter(
                    target => target.expiresAt > Date.now()
                );
            });
        }, 100);

        return () => {
            window.removeEventListener('keydown',handleKeyDown);
            window.removeEventListener('keyup',handleKeyUp);
            window.clearInterval(cleanupInterval);
        }
    }, [])

    useEffect(() => {
        setScore(prev => ({
            ...prev,
            targetsMissed: prev.targetsMissed + missedTargetsRef.current
        }))
    },[missedTargetsRef.current])

    useEffect(() => {
        if(gameState === 'ongoing'){
            generateTarget();
            intervalId.current = window.setInterval(() => {
                if(!isPausedRef.current){
                    generateTarget()
                }
                    // console.log(i++);
            }, targetInterval);
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
            gameState,isPaused,startGame,stopGame,pauseGame,resumeGame, score
        }}>
            {children}
        </GameContext.Provider>
    )
}

export function useGameContext() {
    return useContext(GameContext)
}