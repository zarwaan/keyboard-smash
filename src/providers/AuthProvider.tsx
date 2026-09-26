import useFetch from "@/hooks/useFetch";
import { createContext, useContext, useEffect, useState } from "react";
import type { ILoginDetails } from "shared/types/auth.types";
import type { IUserSessionDetails } from "shared/types/shared.types";

export interface AuthContext {
    loggedIn: boolean,
    userDetails: IUserSessionDetails | null,
    login: (u: IUserSessionDetails) => void,
    logout: () => void
}

const AuthContext = createContext<AuthContext>({} as AuthContext)

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userDetails, setUserDetails] = useState<IUserSessionDetails | null>(null);
    
    const login = (userDetails: IUserSessionDetails) => {
        setLoggedIn(true);
        setUserDetails(userDetails);
    }
    
    const logout = () => {
        setLoggedIn(false);
        setUserDetails(null);
    }
    
    const {data, error, execute: checkSession} = useFetch<ILoginDetails>('/auth/me', {
        credentials: 'include'
    });
    
    useEffect(() => {
        checkSession();
    },[]);

    useEffect(() => {
        if(data && data.result.content?.userDetails){
            login(data.result.content.userDetails)
        }
    },[data]);

    useEffect(() => {
        if(error) console.log(error)
    },[error]);

    return (
        <AuthContext.Provider value={{
            loggedIn, userDetails, login, logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useGlobalAuthContext() {
    return useContext(AuthContext)
}