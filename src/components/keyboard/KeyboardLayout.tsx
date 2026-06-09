import { keyLengthConfig, QwertyRows } from "@/configs/keys.config"
import type { keyType } from "@/types/keyType";
import Key from "./Key";
import ArrowKeys from "./ArrowKeys";

export default function KeyboardLayout() {
    const gapValue = "gap-1";
    return (
        <div className={`w-75/100 border border-(--keyboard-border-color) grid grid-rows-6 aspect-3/1 ${gapValue} p-2 rounded-xl bg-(--keyboard-bg) theme-transition`}>
        {
                QwertyRows.map((keyRow, rowIndex) => 
                    <div className={`flex flex-row grow ${gapValue}`} key={`row-${rowIndex}`}>
                        {
                            keyRow.map((keyValue, columnIndex) => {
                                    let keyOptions: keyType = {
                                        label: keyValue,
                                    }
                                    if(Object.keys(keyLengthConfig).includes(keyValue)) 
                                        keyOptions.length = keyLengthConfig[keyValue as keyof typeof keyLengthConfig]
                                    return(  
                                        keyValue === "arrows" ?  
                                        <ArrowKeys key={'arrowKeys'} />
                                        :
                                        <Key keyOptions={keyOptions} key={`key-${rowIndex}-${columnIndex}`}/>

                                    )
                                }
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}