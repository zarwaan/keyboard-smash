import GameProvider from "./GameProvider";
import GameSettingsProvider from "./GameSettingsProvider";
import UIProvider from "./UIProvider";

export default function AppProviders({children} : {children: React.ReactNode}) {
    return (
        <UIProvider>
            <GameSettingsProvider>
                <GameProvider>
                    {children}
                </GameProvider>
            </GameSettingsProvider>
        </UIProvider>
    )
}