import Toggle from "@/components/Utils/Toggle";
import { useUIContext } from "@/providers/UIProvider";
import { useEffect, useState } from "react"

export default function ThemeToggle() {
    const {currentTheme, setDarkTheme, setLightTheme} = useUIContext();
    return (
        <div className="w-7/100 bordr border-red-400 flex flex-center">
            <Toggle 
                toggleOnState={() => {
                    setDarkTheme();
                }}
                toggleOffState={() => {
                    setLightTheme()
                }}
                isAlreadyOn={currentTheme==='dark' ? true:false}
            />
        </div>
    )
}