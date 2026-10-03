import AuthBox from "../Auth/AuthBox";
import AuthNavProvider from "../Auth/AuthBoxProvider";
import GameControls from "../GameDisplay/ControlDisplay/GameControls";
import Score from "../GameDisplay/ScoreDisplay/Score";
import InstructionBox2 from "../Instructions/2/InstructionBox2";
import KeyboardContainer from "../Keyboard/KeyboardContainer";
import ProfileBox from "../Profile/ProfileBox";

export default function HomeScreen() {
    return (
        <>
            <div className="w-full borde border-green-500 flex flex-center flex-col gap-10">
                <KeyboardContainer />
                <GameControls />
                <Score />
            </div>
            <InstructionBox2 />
            <AuthNavProvider>
                <AuthBox />
            </AuthNavProvider>
            <ProfileBox />
        </>
    )
}