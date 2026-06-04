import type { keyType } from "@/types/keyType";

export default function Key({ keyOptions }: { keyOptions: keyType }) {
    const widthStyle = keyOptions.length ? { width: keyOptions.length } : {flexGrow : 1};
    return (
        <div className="border-[0.5px] border-black rounded-md flex-center bg-(--key-color) shadow-2xl text-(--key-text-color)" style={widthStyle}>
            {
                keyOptions.label === "space" ? "" :
                keyOptions.label === "Blank" ? "?" :
                keyOptions.label
            }
        </div>
    )
}