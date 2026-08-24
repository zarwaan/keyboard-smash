import type { GameSettings } from "@/providers/GameSettingsProvider";
import { type UIState } from "@/providers/UIProvider";
import { useState } from "react";

export interface UserSettings {
    currentTheme: UIState['currentTheme'];
    playMode: GameSettings['playMode'];
    difficulty: GameSettings['difficulty'];
    isMusicMuted: UIState['isMusicMuted'];
    areEffectsMuted: UIState['areEffectsMuted'];
    isFirstTime: UIState['isFirstTime']
}

export type UserSettingKey = keyof UserSettings;

function fetchLocalStorageItem() : UserSettings | undefined {
    const stored = localStorage.getItem("keyboard-smash-settings");
    if(!stored) return undefined;

    try {
        return JSON.parse(stored)
    }
    catch {
        return undefined
    }
}

export default function usePersistentState<T>(setting: UserSettingKey, defaultValue: T) {
    const parsed = fetchLocalStorageItem();

    const [state, SetState] = useState<T>(() => {
        if (parsed && setting in parsed) {
            return parsed[setting] as T;
        }

        return defaultValue
    });

    const setPersistentState = (value: React.SetStateAction<T>) => {
        SetState(prev => {
            const next =
                typeof value === "function"
                    ? (value as (prevState: T) => T)(prev)
                    : value;

            const existing = fetchLocalStorageItem() ?? {};

            localStorage.setItem(
                "keyboard-smash-settings",
                JSON.stringify({
                    ...existing,
                    [setting]: next
                })
            );

            return next;
        });
    };

    return [state, setPersistentState] as const
}