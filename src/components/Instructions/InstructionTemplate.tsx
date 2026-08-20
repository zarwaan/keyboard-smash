import { useUIContext } from "@/providers/UIProvider"

export default function InstructionTemplate({title, imgName}: {title: string, imgName: 
    'target' | 'bomb' | 'score' | 'game-over' | 'settings'
}) {
    const {currentTheme} = useUIContext();
    return (
        <div className="flex flex-col gap-5 ">
            <div className="borde text-(--text-color) text-left theme-transition">
                <span className="font-bold text-lg">{title}</span>
                <hr className="border-t-2 border-(--text-color)/30" />
            </div>
            <div className="flex flex-center">
                <img src={`/screenshots/instructions/${currentTheme}/${imgName}.jpg`} alt={imgName} 
                className={`${imgName==='settings' ? 'w-65/100 rounded-xl' : ''}`}/>
            </div>
        </div>
    )
}