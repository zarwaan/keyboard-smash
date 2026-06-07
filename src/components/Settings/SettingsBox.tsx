import SectionBox from "./Section/SectionBox";
import SectionHeader from "./Section/SectionHeader";
import SectionBody from "./Section/SectionBody";
import SectionOption from "./Section/SectionOption";
import ThemeToggle from "./ThemeToggle/ThemeToggle";

export default function SettingsBox() {
    return (
        <div className="border-0.5 absolute top-10 w-1/2 min-h-1/2 max-h-3 text-(--text-color) border bg-(--bg-color) rounded-xl z-10 flex flex-col p-4 theme-transition">
            <SectionBox>
                <SectionHeader title="Appearance" />
                <SectionBody>
                    <SectionOption>
                        <span>Dark mode</span>
                        <ThemeToggle />
                    </SectionOption>
                </SectionBody>
            </SectionBox>
        </div>
    )
}