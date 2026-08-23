import useBooleanState from "@/hooks/useBooleanState";
import usePersistentState from "@/hooks/usePersistentState";
import { createContext, useContext } from "react"

type theme = 'light' | 'dark';

export interface UIState {
    isSettingsOpen : boolean,
    openSettings : () => void,
    closeSettings : () => void,

    isInstructionOpen : boolean,
    openInstruction : () => void,
    closeInstruction : () => void,

    currentTheme : theme,
    setLightTheme : () => void,
    setDarkTheme : () => void

    isMusicMuted : boolean,
    muteMusic : () => void,
    unmuteMusic : () => void,

    areEffectsMuted : boolean,
    muteEffects : () => void,
    unmuteEffects : () => void
}

const UIContext = createContext<UIState>({
    isSettingsOpen: false,
    openSettings : () => {},
    closeSettings: () => {},

    isInstructionOpen : false,
    openInstruction : () => {},
    closeInstruction : () => {},

    currentTheme : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    setLightTheme: () => {},
    setDarkTheme: () => {},

    isMusicMuted : false,
    muteMusic : () => {},
    unmuteMusic : () => {},

    areEffectsMuted : false,
    muteEffects : () => {},
    unmuteEffects : () => {},
})

export default function UIProvider({children} : {children: React.ReactNode}) {
    const [ isSettingsOpen, openSettings, closeSettings ] = useBooleanState(false);
    const [isInstructionOpen, openInstruction, closeInstruction] = useBooleanState(false);

    const [currentTheme, setCurrentTheme] = usePersistentState<theme>(
       "currentTheme", document.documentElement.getAttribute('data-theme') as theme
    );

    const setLightTheme = () => {
        setCurrentTheme('light');
        document.documentElement.setAttribute('data-theme', 'light')
    }
    const setDarkTheme = () => {
        setCurrentTheme('dark');
        document.documentElement.setAttribute('data-theme', 'dark')
    }

    const [isMusicMuted, muteMusic, unmuteMusic] = useBooleanState(false, {
        persist: true,
        persistKey: 'isMusicMuted'
    });

    const [areEffectsMuted, muteEffects, unmuteEffects] = useBooleanState(false, {
        persist: true,
        persistKey: 'areEffectsMuted'
    });

    return (
        <UIContext.Provider value={{
            isSettingsOpen, openSettings, closeSettings, 
            isInstructionOpen, openInstruction, closeInstruction,
            currentTheme, setLightTheme, setDarkTheme,
            isMusicMuted, muteMusic, unmuteMusic,
            areEffectsMuted, muteEffects, unmuteEffects
        }}>
            {children}
        </UIContext.Provider>

    )
}

export function useUIContext() {
    return useContext(UIContext)
}