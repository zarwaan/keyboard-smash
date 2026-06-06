import Toggle from "@/components/Utils/Toggle";
import { useEffect, useState } from "react"

export default function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark'>("light");

    useEffect(() => {document.documentElement.setAttribute('data-theme', theme);},[theme]);
    return (
        <div className="w-7/100 bordr border-red-400 flex flex-center">
            <Toggle 
                toggleOnState={() => {
                    setTheme("dark");
                }}
                toggleOffState={() => {
                    setTheme("light")
                }}
            />
        </div>
    )
}