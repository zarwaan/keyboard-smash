import KeyboardContainer from "@/components/Keyboard/KeyboardContainer";
import SettingsIcon from "../Settings/SettingsIcon";
import SettingsBox from "../Settings/SettingsBox";
import Header from "./Header";
import MainBody from "./MainBody";
import GameControls from "../GameDisplay/ControlDisplay/GameControls";
import Score from "../GameDisplay/ScoreDisplay/Score";

export default function ContentLayout() {
    return (
        <div className="border-(--text-color) border- h-[98vh] text-center flex flex-col justify-items-center p-4 relative 
        main-content gap-10">
            <Header />
            <MainBody>
                <KeyboardContainer />
                <GameControls />
                <Score />
            </MainBody>
            <SettingsBox />
            <SettingsIcon />
        </div>
    )
}

// **:transition-colors **:duration-300