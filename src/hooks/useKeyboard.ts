import { useEffect } from "react";

export default function useKeyboard() {
    useEffect(() => {
        function handleKeyPress(e: KeyboardEvent){
            console.log(e.code)
        }

        window.addEventListener('keydown',handleKeyPress);
        return () => window.removeEventListener('keydown',handleKeyPress)
    }, [])
}