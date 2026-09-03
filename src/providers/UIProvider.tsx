import useBooleanState from "@/hooks/useBooleanState";
import usePersistentState from "@/hooks/usePersistentState";
import { createContext, useContext, useEffect, useState } from "react"

type theme = 'light' | 'dark';
export type WalkthroughPhaseType = 
                            'settings' | 
                            'instructions' | 
                            'hit_target_v3' |
                            'bomb_u' |
                            'powerups' |
                            'score_display' |
                            'lives' |
                            'share_score' | 
                            '$$OVER$$'

export interface ToastInterface {
    type : 'SUCCESS' | '$$NONE$$' | 'INFO'
    label: string
}

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
    unmuteEffects : () => void,

    isFirstTime: boolean,
    walkthroughPhase: WalkthroughPhaseType,
    setWalkthroughPhase: (_: WalkthroughPhaseType) => void

    toast: ToastInterface,
    createToast: (_: ToastInterface) => void 
}

const UIContext = createContext<UIState>({} as UIState)

export default function UIProvider({children} : {children: React.ReactNode}) {
    const [ isSettingsOpen, openSettings, closeSettings ] = useBooleanState(false);
    const [isInstructionOpen, openInstruction, closeInstruction] = useBooleanState(false);
    const [isFirstTime, setIsFirstTime] = usePersistentState<boolean>('isFirstTime', true);
    const [walkthroughPhase, setWalkthroughPhase] = useState<WalkthroughPhaseType>(isFirstTime ? 'instructions' : '$$OVER$$');

    const [toast, setToast] = useState<ToastInterface>({
        type: '$$NONE$$',
        label: ""
    });
    const createToast = (toast: ToastInterface) => {
        setToast(toast);
        setTimeout(() => {
            setToast(prev => ({
                ...prev,
                type: '$$NONE$$',
            }))
        },5000)
    }

    useEffect(() => {
        if(walkthroughPhase==='$$OVER$$') 
            setIsFirstTime(false)
    },[walkthroughPhase])

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
            areEffectsMuted, muteEffects, unmuteEffects,
            isFirstTime, setWalkthroughPhase, walkthroughPhase,
            toast, createToast
        }}>
            {children}
        </UIContext.Provider>

    )
}

export function useUIContext() {
    return useContext(UIContext)
}