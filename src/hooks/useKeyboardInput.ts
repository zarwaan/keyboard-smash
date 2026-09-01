import { useEffect, useRef, useState } from "react";

function getNameOfKey(e: KeyboardEvent): string {
    const disabledKeys = ["control", "alt", "arrowup", "arrowdown", "arrowleft", "arrowright"];
    if (e.key.toLowerCase() === "shift") return e.code.toLowerCase();
    if (e.code.toLowerCase() === "metaleft" || e.key.toLowerCase() === "capslock") return "caps lock";
    if (e.code.toLowerCase() === "backquote") return "`";
    if (disabledKeys.includes(e.key.toLowerCase())) return "";
    return e.key.toLowerCase();
}

export function useKeyboardInput(enabled: boolean, pressAll: boolean, allKeys: string[]) {
    const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

    const enabledRef = useRef(enabled);
    useEffect(() => {
        enabledRef.current = enabled;
    }, [enabled]);

    const pressAllRef = useRef(pressAll);
    useEffect(() => {
        pressAllRef.current = pressAll
    },[pressAll]);

    useEffect(() => {
        if(pressAll){
            setPressedKeys(new Set(allKeys))
        }
        else {
            setPressedKeys(new Set())
        }
    }, [pressAll])

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (!enabledRef.current) return;

            const key = getNameOfKey(e);
            if (key === "tab") e.preventDefault();
            if (e.repeat || !key) return;

            setPressedKeys(prev => new Set(prev).add(key));

            if (key === "caps lock") {
                setTimeout(() => {
                    setPressedKeys(prev => {
                        const next = new Set(prev);
                        next.delete("caps lock");
                        return next;
                    });
                }, 150);
            }
        }

        function handleKeyUp(e: KeyboardEvent) {
            if (!enabledRef.current) return;
            if(pressAllRef.current) return;
            const key = getNameOfKey(e);
            if (!key) return;

            setPressedKeys(prev => {
                const next = new Set(prev);
                next.delete(key);
                return next;
            });
        }

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    return {
        pressedKeys,
        isPressed: (keyValue: string) => pressedKeys.has(keyValue.toLowerCase()),
    };
}