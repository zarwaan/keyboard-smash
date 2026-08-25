import { motion } from "motion/react";

export default function BackgroundBlur() {
    return (
        <motion.div className={`absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.6)] backdrop-blur-xs`}
            initial={{opacity: 0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{duration: 0.5, ease: "easeInOut"}}
        />
    )
}