import { useEffect, useState } from "react"

export default function Toggle({toggleOnState, toggleOffState} : {
    toggleOnState: () => void,
    toggleOffState: () => void,
}) {
    const [toggleOn, setToggleOn] = useState(false);
    const handleClick = () => {
        setToggleOn(prev => !prev);
    }
    useEffect(() => {
        toggleOn ? toggleOnState() : toggleOffState();
    }, [toggleOn]);
    return (
        <div className={`w-full rounded-full aspect-2/1 relative transition-colors duration-200
        ${ toggleOn ? "bg-indigo-500" : "bg-gray-400"}` }
            onClick={handleClick}>
            <div className={`absolute h-[84%] top-[8%] left-[6%] aspect-square rounded-full bg-(--full-white)
                transition-transform duration-300 ${ toggleOn ? 'translate-x-[106%]' : 'translate-x-0' }`}
            />
        </div>
    )
}