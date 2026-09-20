import { motion } from "motion/react"
import type { DBUser } from "shared/types/shared.types"

export default function SubmitButton({onClick}
    :
    {
        onClick: () => void
    }
) {
    return (
        <motion.button className="rounded-full px-2 py-1 bg-indigo-600 w-3/10 text-(--full-white) self-center cursor-pointer"
            onClick={() => {
                
            }}
            whileTap={{
                scale: 0.95
            }}
        >
            Submit
        </motion.button>
    )
}