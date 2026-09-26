import { createContext, useContext, useState } from "react";

export interface IAuthNav {
    view: "login" | "register",
    pos: number,
    setLoginView: () => void,
    setRegisterView: () => void,
    errorMessage: string | null,
    setErrorMessage: (s: string | null) => void
}

const AuthNavContext = createContext<IAuthNav>({} as IAuthNav);

export default function AuthNavProvider({ children }: { children: React.ReactNode }) {
    const [view, setView] = useState<IAuthNav['view']>("login");
    const [pos, setPos] = useState(0);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const setLoginView = () => {
        setView("login");
        setPos(0);
    }
    const setRegisterView = () => {
        setView("register");
        setPos(1);
    }
    
    return (
        <AuthNavContext.Provider value={{
            view, pos, setLoginView, setRegisterView, errorMessage, setErrorMessage
        }}>
            {children}
        </AuthNavContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthNavContext)
}