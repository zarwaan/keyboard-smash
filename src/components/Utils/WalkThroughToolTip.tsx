import { useEffect, useLayoutEffect, useState } from "react";
import { useUIContext } from "@/providers/UIProvider";
import { motion } from "motion/react";

interface Position {
    top: number | 'unset';
    left: number | 'unset';
    right: number | 'unset';
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

    const configs: Partial<Record<typeof walkthroughPhase, phaseDetails>> = {
        settings: {
            elemId: "#settings-icon",
            label: 'You can adjust gameplay (difficulty, \n mode, sounds etc) in settings',
            from: 'right',
            next: 'share_score'
        },
        instructions: {
            elemId: "#instructions-icon",
            label: 'Welcome! \n Click here to learn how to play',
            from: 'right',
            next: 'settings'
        },
        share_score: {
            elemId: "#share-score",
            label: "Share your score \nwith your friends!",
            from: 'right',
            next: '$$OVER$$'
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
            left: config.from==='left' ? dims.x : 'unset',
            right: config.from==='right' ? document.documentElement.getBoundingClientRect().width - (dims.x + dims.width) : 'unset'
        });
    }, [config])

    if (!position) return null;

    if(!config) return;

    return (
        <motion.div
            className="fixed z-10 bg-indigo-500 py-2 px-4 rounded-xl transition-transform duration-300 flex flex-col 
            flex-center text-(--full-white) gap-2"
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
                duration: 0.5,
                ease: "easeInOut"
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