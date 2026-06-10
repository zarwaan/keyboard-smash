import GameProvider from "./GameProvider";
import UIProvider from "./UIProvider";

export default function AppProviders({children} : {children: React.ReactNode}) {
    return (
        <UIProvider>
            <GameProvider>
                {children}
            </GameProvider>
        </UIProvider>
    )
}