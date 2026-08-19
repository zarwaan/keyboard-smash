import { useEffect, useRef, useState } from "react";
import InstructionsIcon from "./HeaderIcons/InstructionsIcon";
import SettingsIcon from "./HeaderIcons/SettingsIcon";

export default function Header({}) {
    const heightToBeRef = useRef<HTMLSpanElement>(null);
    const [h, setH] = useState(0);

    useEffect(() => {
        setH(heightToBeRef.current?.offsetHeight ?? 0)
    },[heightToBeRef.current]);

    return (
        <div className=" w-full text-7xl text-indigo-500 font-black theme-transition font-(family-name:--header-font) tracking-wider relative 
        flex flex-row gap-2 flex-center">
            <span ref={heightToBeRef} className="h-fit">Keyboard</span> 
            <span style={{
                height: `${h+20}px`
            }}
            className="aspect-square overflow-visible">
                <img src="/logo/mole.png" alt="" className="rounded-xl mt-2"/>
            </span>
            <span>Smash</span>
            <div className="absolute w-full top-0 left-0 h-full borde border-white flex justify-end items-center gap-3.5 ">
                <SettingsIcon />
                <InstructionsIcon />
            </div>
        </div>
    )
}