import { AnimatePresence, motion, usePresenceData, wrap } from "motion/react"
import { forwardRef, type SVGProps, useState } from "react"
import InstructionTemplate from "./InstructionTemplate";
import { useUIContext } from "@/providers/UIProvider";

const INSTRUCTIONS = [
    <InstructionTemplate title={`1. Hit the targets! (-1 \u00A0❤️\u00A0 if you miss)`} imgName="target"/>,
    <InstructionTemplate title={"2. Watch out for bombs! (-2 \u00A0❤️\u00A0 if you hit)"} imgName="bomb"/>,
    <InstructionTemplate title="3. Keep an eye on the scoreboard!" imgName="score"/>,
    <InstructionTemplate title="4. Don't run out of lives!" imgName="game-over"/>,
    <InstructionTemplate title="5. Adjust gameplay in settings" imgName="settings"/>
]

export default function InstructionCarousel() {
    const {closeInstruction} = useUIContext();
    const items = INSTRUCTIONS.map((_,i) => i);
    const [selectedItem, setSelectedItem] = useState(items[0])
    const [direction, setDirection] = useState<1 | -1>(1)

    function setSlide(newDirection: 1 | -1) {
        const nextItem = wrap(0, items.length, selectedItem + newDirection)
        setSelectedItem(nextItem)
        setDirection(newDirection)
    }

    const page = INSTRUCTIONS[selectedItem];

    const NavButton = ({children, handleClick} : {children: React.ReactNode, handleClick: () => void}) => {
        return(
            <motion.button className="flex flex-row flex-center gap-2 px-6 py-1.5 m-2 rounded-full bg-indigo-500 cursor-pointer"
            onClick={handleClick}
            whileTap={{ scale: 0.9 }}
            >
                {children}
            </motion.button>
        )
    }

    return (
        <div className="flex flex-center flex-col">
            <div className="flex flex-center">
                <AnimatePresence
                    custom={direction}
                    initial={false}
                    mode="popLayout"
                >
                    <Slide key={"page-"+selectedItem} page={page} />
                </AnimatePresence>
            </div>
            <div className="flex flex-row justify-around w-full">
                <NavButton handleClick={() => {if(selectedItem===0) return; setSlide(-1)}}>
                    <ArrowLeft />
                </NavButton>
                <NavButton handleClick={() => {if(selectedItem===items.length-1) {closeInstruction(); return;} setSlide(1)}}>
                    <ArrowRight />
                </NavButton>
            </div>
        </div>
    )
}

const Slide = forwardRef(function Slide(
    { page }: { page: typeof INSTRUCTIONS[0] },
    ref: React.Ref<HTMLDivElement>
) {
    const direction = usePresenceData()
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, x: direction * 30 }}
            animate={{
                opacity: 1,
                x: 0,
                transition: {
                    ease: "anticipate",
                    type: 'spring',
                    duration: 0.8
                },
            }}
            exit={{ opacity: 0, x: direction * -30 }}
            className="h-100"
        >
            {page}
        </motion.div>
    )
})

const iconsProps: SVGProps<SVGSVGElement> = {
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--color-white)",
    strokeWidth: "4",
    strokeLinecap: "round",
    strokeLinejoin: "round",
}

function ArrowLeft() {
    return (
        <svg {...iconsProps}>
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
        </svg>
    )
}

function ArrowRight() {
    return (
        <svg {...iconsProps}>
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    )
}