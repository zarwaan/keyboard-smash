import UIProvider from "./UIProvider";

export default function AppProviders({children} : {children: React.ReactNode}) {
    return (
        <UIProvider>
                {children}
        </UIProvider>
    )
}