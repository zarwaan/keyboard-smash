import { useEffect, useRef, useState } from "react";

// Normalizes a raw KeyboardEvent into the string your target keys use.
// Kept as a plain function (not part of the hook) so it's easy to unit test
// or reuse elsewhere without pulling in React.
function getNameOfKey(e: KeyboardEvent): string {
    const disabledKeys = ["control", "alt", "arrowup", "arrowdown", "arrowleft", "arrowright"];
    if (e.key.toLowerCase() === "shift") return e.code.toLowerCase();
    if (e.code.toLowerCase() === "metaleft" || e.key.toLowerCase() === "capslock") return "caps lock";
    if (e.code.toLowerCase() === "backquote") return "`";
    if (disabledKeys.includes(e.key.toLowerCase())) return "";
    return e.key.toLowerCase();
}

/**
 * Tracks which keys are currently held down. `enabled` lets the caller
 * suppress input (e.g. while the game is paused) without having to
 * add/remove the window listeners themselves.
 */
export function useKeyboardInput(enabled: boolean) {
    const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

    // Listeners are attached once; `enabledRef` lets them read the latest
    // `enabled` value without needing to be re-attached every time it changes.
    const enabledRef = useRef(enabled);
    useEffect(() => {
        enabledRef.current = enabled;
    }, [enabled]);

    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (!enabledRef.current) return;

            const key = getNameOfKey(e);
            if (key === "tab") e.preventDefault();
            if (e.repeat || !key) return;

            setPressedKeys(prev => new Set(prev).add(key));

            // Caps Lock never fires keyup reliably, so we clear it ourselves.
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