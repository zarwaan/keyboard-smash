import type { GameSettings } from "@/providers/GameSettingsProvider";
import { type UIState } from "@/providers/UIProvider";
import { useState } from "react";

export interface UserSettings {
    currentTheme: UIState['currentTheme'];
    playMode: GameSettings['playMode'];
    difficulty: GameSettings['difficulty'];
    isMusicMuted: UIState['isMusicMuted'];
    areEffectsMuted: UIState['areEffectsMuted'];
}

const initSettings = {} as UserSettings;

function fetchLocalStorageItem(){
    const stored = localStorage.getItem("keyboard-smash-settings");
    let parsed: UserSettings | undefined;
    if(stored) 
        parsed = JSON.parse(stored); 

    return parsed
}

export default function usePersistentState<T>(setting: keyof typeof initSettings, defaultValue: T) {
    // const stored = localStorage.getItem("keyboard-smash-settings");
    // let parsed: UserSettings

    const parsed = fetchLocalStorageItem();

    let settingValue: UserSettings[typeof setting];

    // if(stored){
    //     parsed = JSON.parse(stored)
    //     settingValue = parsed[setting]
    // }

    if(parsed){
        settingValue = parsed[setting]
    }

    const [state, SetState] = useState<T>(() => {
        if(parsed && settingValue) return settingValue as T;
        return defaultValue
    });

    const setPersistentState = (value: React.SetStateAction<T>) => {
        SetState(value);
        let newSettings: Partial<UserSettings> = {};
        const newParsed = fetchLocalStorageItem();

        if(newParsed){
            newSettings = {...newParsed}
        }
        newSettings = {
            ...newSettings,
            [setting] : value
        }
        localStorage.setItem("keyboard-smash-settings", JSON.stringify(newSettings))
    }

    return [state, setPersistentState] as const
}