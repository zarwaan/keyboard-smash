import GameProvider from "./GameProvider";
import GameSettingsProvider from "./GameSettingsProvider";
import SoundProvider from "./SoundProvider";
import UIProvider from "./UIProvider";

export default function AppProviders({children} : {children: React.ReactNode}) {
    return (
        <UIProvider>
            <SoundProvider>
                <GameSettingsProvider>
                    <GameProvider>
                        {children}
                    </GameProvider>
                </GameSettingsProvider>
            </SoundProvider>
        </UIProvider>
    )
}