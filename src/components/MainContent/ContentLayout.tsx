import KeyboardContainer from "@/components/Keyboard/KeyboardContainer";
import SettingsIcon from "../Settings/SettingsIcon";
import SettingsBox from "../Settings/SettingsBox";

export default function ContentLayout() {
    return (
        <div className="border-black border-2 h-[98vh] text-center flex-col justify-items-center m-2 p-2 relative **:transition-colors **:duration-300">
            <div className="w-full border">
                <SettingsIcon />
            </div>
            <KeyboardContainer />
            <SettingsBox />
        </div>
    )
}