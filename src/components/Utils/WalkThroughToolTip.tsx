import { useEffect, useLayoutEffect, useState } from "react";
import { useUIContext } from "@/providers/UIProvider";
import { motion } from "motion/react";

interface Position {
    top: number | '';
    left: number | '';
    right: number | '';
}

export default function WalkThroughToolTip() {
    
    const { walkthroughPhase, setWalkthroughPhase } = useUIContext();
    const [config, setConfig] = useState<phaseDetails>();
    
    interface phaseDetails {
        elemId: string,
        label: string,
        from: 'left' | 'right',
        next: typeof walkthroughPhase
    }

    const [position, setPosition] = useState<Position | null>(null);

    const configs: Record<typeof walkthroughPhase, phaseDetails> = {
        settings: {
            elemId: "#settings-icon",
            label: 'You can adjust gameplay (difficulty, mode, sounds etc) in settings',
            from: 'right',
            next: 'hit_target_v3'
        },
        instructions: {
            elemId: "#instructions-icon",
            label: 'Welcome! \n Click here to learn how to play',
            from: 'right',
            next: 'settings'
        },
        share_score: {
            elemId: "#share-score",
            label: "Share your score with your friends!",
            from: 'right',
            next: '$$OVER$$'
        },
        lives: {
            elemId: "#lives-display",
            label: "Keep an eye on your lives!",
            from: 'right',
            next: 'share_score'
        },
        score_display: {
            elemId: "#score-display",
            label: "See your score here!",
            from: 'left',
            next: 'lives'
        },
        hit_target_v3: {
            elemId: "#key-e",
            label: "Smash the targets with your keyboard!",
            from: 'right',
            next: 'bomb_u'
        },
        bomb_u : {
            elemId: "#key-u",
            label: "Watch out for bombs!",
            from: 'right',
            next: 'powerups'
        },
        powerups: {
            elemId: '#key-0',
            label: "Collect powerups!",
            from: 'right',
            next: 'score_display',
        },
        "$$OVER$$": {} as phaseDetails
    };

    useLayoutEffect(() => {
        if (walkthroughPhase === "$$OVER$$") return;

        setConfig(configs[walkthroughPhase]);

    }, [walkthroughPhase]);

    useEffect(() => {
        if(!config) return;

        const target = document.querySelector(
            config.elemId
        );

        if (!target) return;

        const dims = target.getBoundingClientRect();

        setPosition({
            top: dims.y + dims.height + 20,
            left: config.from==='left' ? dims.x : '',
            right: config.from==='right' ? document.documentElement.getBoundingClientRect().width - (dims.x + dims.width) : ''
        });

    }, [config])

    if (!position) return null;

    if(!config) return;

    return (
        <motion.div
            className="absolute z-10 bg-indigo-500 py-2 px-4 rounded-xl transition-transform duration-300 flex flex-col 
            flex-center text-(--full-white) gap-2 w-55 "
            style={{
                top: position.top,
                left: position.left,
                right: position.right
            }}
            initial={{ opacity: 0 }}
            animate={{
                opacity: 1,
                top: position.top,
                left: position.left,
                right: position.right,
            }}
            transition={{
                ease: "linear",
                type: "spring",
                damping: 15,
            }}
            exit={{ opacity: 0 }}
        >
            <p className="whitespace-pre-line text-center">{config.label}</p>
            <div>
                <button className="py-1 px-4 bg-indigo-900 rounded-xl cursor-pointer" 
                onClick={() => {setWalkthroughPhase(config.next)}}>
                    {
                        config.next==="$$OVER$$" ? 'Done' : 'Next'
                    }
                </button>
            </div>
        </motion.div>
    );
}