import Key from "./Key";

export default function ArrowKeys({disabled}:{disabled:boolean}) {
    return (
        <div className="w-[18%] grid grid-rows-2 grid-cols-3 text-xs">
            {
                [
                    "",
                    '▲',
                    "",
                    '◀',
                    '▼',
                    '▶'
                ].map((arrow, index) => 
                    {
                        return(
                            arrow === "" ? <div key={`arrow-${index}`}></div> :
                            <Key keyOptions={{
                                label: arrow,
                                disabled: disabled
                            }} 
                            key={`arrow-${index}`}/>
                        )
                    }
                )
            }
        </div>
    )
}