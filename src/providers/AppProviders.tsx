import AuthProvider from "./AuthProvider";
import GameProvider from "./GameProvider";
import GameSettingsProvider from "./GameSettingsProvider";
import SoundProvider from "./SoundProvider";
import UIProvider from "./UIProvider";

export default function AppProviders({children} : {children: React.ReactNode}) {
    return (
        <AuthProvider>
            <UIProvider>
                <SoundProvider>
                    <GameSettingsProvider>
                        <GameProvider>
                            {children}
                        </GameProvider>
                    </GameSettingsProvider>
                </SoundProvider>
            </UIProvider>
        </AuthProvider>
    )
}