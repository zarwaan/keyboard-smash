import { useUIContext, type ToastInterface } from "@/providers/UIProvider";
import { motion } from "motion/react";
import { useRef } from "react";

interface toastConfig {
    bg: string,
    highlight: string
}

const TOAST_CONFIGS : Record<ToastInterface['type'],toastConfig> = {
    'SUCCESS': {
        bg: 'var(--color-green-800)',
        highlight: 'var(--color-green-300)'
    },
    '$$NONE$$': {
        bg: '',
        highlight: ''
    }
}

export default function Toast() {
    const {toast, currentTheme} = useUIContext();
    const config = TOAST_CONFIGS[toast.type];
    const prevConfig = useRef(config);
    return (
        <motion.div className="theme-transition absolute top-[90%] right-2 flex flex-row rounded-lg overflow-clip w-70 h-12 border -z-1"
            style={{
                backgroundColor: config.bg || prevConfig.current.bg,
                borderColor: currentTheme === 'light' ? config.bg || prevConfig.current.bg : config.highlight || prevConfig.current.highlight
            }}
            initial={{
                right: 'calc(var(--spacing) * -75)'
            }}
            animate={{
                right: 'calc(var(--spacing) * 2)'
            }}
            exit={{
                right: 'calc(var(--spacing) * -75)'
            }}
            transition={{
                duration: 0.4,
                ease: 'easeInOut'
            }}
        >
            <div className="w-[2%] min-h-full" 
                style={{
                    backgroundColor: config.highlight || prevConfig.current.highlight
                }}
            />
            <div className="pr-4 w-full flex items-center justify-end text-(--full-white)">
                {toast.label}
            </div>
        </motion.div>
    )
}