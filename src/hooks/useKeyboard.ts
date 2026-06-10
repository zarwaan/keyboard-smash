import { useEffect } from "react";

export default function useKeyboard() {
    const getNameOfKey = (e: KeyboardEvent) : string => e.key.toLowerCase() === "shift" ? e.code : e.key.toLowerCase() === "meta" ? "caps lock" : e.key ;

    useEffect(() => {
        function handleKeyPress(e: KeyboardEvent){
            console.log(getNameOfKey(e))
        }

        window.addEventListener('keydown',handleKeyPress);
        return () => window.removeEventListener('keydown',handleKeyPress)
    }, [])
}