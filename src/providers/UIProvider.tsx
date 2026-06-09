import { createContext, useContext, useState } from "react"

type theme = 'light' | 'dark';

interface UIState {
    isSettingsOpen : boolean,
    openSettings : () => void,
    closeSettings : () => void,

    currentTheme : theme,
    setLightTheme : () => void,
    setDarkTheme : () => void
}

const UIContext = createContext<UIState>({
    isSettingsOpen: false,
    openSettings : () => {},
    closeSettings: () => {},

    currentTheme : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    setLightTheme: () => {},
    setDarkTheme: () => {}
})

export default function UIProvider({children} : {children: React.ReactNode}) {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const openSettings = () => {setIsSettingsOpen(true)};
    const closeSettings = () => {setIsSettingsOpen(false)};

    const [currentTheme, setCurrentTheme] = useState<theme>(
        document.documentElement.getAttribute('data-theme') as theme
    );
    const setLightTheme = () => {
        setCurrentTheme('light');
        document.documentElement.setAttribute('data-theme', 'light')
    }
    const setDarkTheme = () => {
        setCurrentTheme('dark');
        document.documentElement.setAttribute('data-theme', 'dark')
    }

    return (
        <UIContext.Provider value={{
            isSettingsOpen, openSettings, closeSettings, 
            currentTheme, setLightTheme, setDarkTheme
        }}>
            {children}
        </UIContext.Provider>

    )
}

export function useUIContext() {
    return useContext(UIContext)
}