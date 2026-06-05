import { useEffect, useState } from "react"

export default function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark'>("light");

    useEffect(() => {document.documentElement.setAttribute('data-theme', theme); console.log(document.documentElement.getAttribute('data-theme'))},[theme]);
    return (
        <button className="text-(--text-color) border p-3" onClick={()=>setTheme(theme === "light" ? "dark" : "light")}>Change</button>
    )
}