import { keyLengthConfig, QwertyRows } from "@/configs/keys.config"
import Key from "./Key"
import type { keyType } from "@/types/keyType";

export default function KeyboardLayout() {
    const gapValue = "gap-1";
    return (
        // <div className={`w-75/100 border grid grid-rows-6 h-45/100 ${gapValue}`}>
        <div className={`w-75/100 border flex flex-col h-45/100 ${gapValue} p-2 rounded-md`}>
        {
                QwertyRows.map((keyRow, rowIndex) => 
                    // <div className={`grid grid-rows-1 grid-cols-${keyRow.length} ${gapValue}`}>
                    <div className={`flex flex-row ${gapValue} grow`} key={`row-${rowIndex}`}>
                        {
                            keyRow.map((keyValue, columnIndex) => {
                                    let keyOptions: keyType = {
                                        label: keyValue,
                                    }
                                    if(Object.keys(keyLengthConfig).includes(keyValue)) 
                                        keyOptions.length = keyLengthConfig[keyValue as keyof typeof keyLengthConfig]
                                    return(    
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