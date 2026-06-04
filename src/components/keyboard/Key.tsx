import type { keyType } from "@/types/keyType";

export default function Key({ keyOptions }: { keyOptions: keyType }) {
    const widthStyle = keyOptions.length ? { width: keyOptions.length } : {flexGrow : 1};
    return (
        <div className="border rounded-md flex-center" style={widthStyle}>
            {keyOptions.label}
        </div>
    )
}