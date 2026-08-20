import dig from "@/assets/images/game_over/diglett.gif"
import { motion } from "motion/react";
import { useRef, useState, useEffect } from "react";

const makeLetters = (word: string) => {
    const wordArr = Array.from(word);
    const Letter = ({letter, indexNum}: {letter: string, indexNum: number}) => {
        const travelDuration = 0.5
        const initDelay = 0.1
        const delayFactor = 3
        return (
            <motion.span 
                className="h-fit flex-center"
                animate={{
                    y: [0,-10,0]
                }}
                transition={{
                    delay: initDelay + (travelDuration*indexNum/delayFactor),
                    duration: travelDuration,
                    ease: 'linear',
                    repeat: Infinity,
                    repeatDelay: initDelay + (travelDuration*(wordArr.length - 1)/delayFactor) + 0.7
                }}
            >
                {letter}
            </motion.span>
        )
    }

    return wordArr.map((l,i) => <Letter letter={l} key={"l-"+i} indexNum={i+1}/>)
}

export default function GameOverBox({}) {
    const heightToBeRef = useRef<HTMLSpanElement>(null);
    const [h, setH] = useState(0);

    useEffect(() => {
        setH(heightToBeRef.current?.offsetHeight ?? 0)
    },[heightToBeRef.current]);

    const letters = makeLetters("GAMEOVER");

    return (
        <div className="theme-transition text-(--text-color) w-fit m-auto p-4 flex flex-row gap-3 text-6xl
        font-(family-name:--header-font) tracking-widest">
            <span ref={heightToBeRef} className="h-fit flex flex-row">
                {
                    letters.slice(0,4)
                }
            </span>
            <span style={{
                height: `${h+20}px`
                }}
                className="aspect-square overflow-visible "
            >
                <img src={dig} alt="" className="-mt-3"/>
            </span>
            <span className="h-fit flex flex-row">
                {
                    letters.slice(4)
                }
            </span>
        </div>
    )
}