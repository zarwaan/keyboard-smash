import SectionBox from "./Section/SectionBox";
import SectionHeader from "./Section/SectionHeader";
import SectionBody from "./Section/SectionBody";
import SectionOption from "./Section/SectionOption";

export default function SettingsBox() {
    return (
        <div className="absolute top-10 w-1/2 min-h-1/2 max-h-3 border text-(--text-color) bg-(--bg-color) rounded-xl z-10 flex flex-col p-4">
            <SectionBox>
                <SectionHeader title="Appearance" />
                <SectionBody>
                    <SectionOption>
                        <span>name</span>
                        <span>options</span>
                    </SectionOption>
                    <SectionOption>
                        <span>name</span>
                        <span>options</span>
                    </SectionOption>
                </SectionBody>
            </SectionBox>
        </div>
    )
}