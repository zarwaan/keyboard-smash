import Key from "./Key";

export default function ArrowKeys() {
    return (
        <div className="w-[18%] grid grid-rows-2 grid-cols-3 gap-0.75 text-xs">
            <div></div>
            <Key keyOptions={{
                label: '▲'
            }} />
            <div></div>
            <Key keyOptions={{
                label: '◀'
            }} />
            <Key keyOptions={{
                label: '▼'
            }} />
            <Key keyOptions={{
                label: '▶'
            }} />
        </div>
    )
}