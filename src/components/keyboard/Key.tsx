import type { keyType } from "@/types/keyType";

export default function Key({ keyOptions }: { keyOptions: keyType }) {
    const widthStyle = keyOptions.length ? { width: keyOptions.length } : {flexGrow : 1};
    return (
        <div className="border-[0.5px] rounded-md flex-center bg-gray-50 shadow-xl" style={widthStyle}>
            {keyOptions.label}
        </div>
    )
}