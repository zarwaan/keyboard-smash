import KeyboardContainer from "@/components/keyboard/KeyboardContainer";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

export default function ContentLayout() {
    return (
        <div className="border-black border-2 h-[98vh] text-center flex-col justify-items-center m-2 p-2 relative">
            <ThemeToggle />
            <KeyboardContainer />
        </div>
    )
}