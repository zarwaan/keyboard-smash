import { keyLengthConfig, QwertyRows } from "@/configs/keys.config"
import Key from "./Key"
import type { keyType } from "@/types/keyType";
import ArrowKeys from "./ArrowKeys";

export default function KeyboardLayout() {
    const gapValue = "gap-1";
    return (
        <div className={`w-75/100 border grid grid-rows-6 h-45/100 ${gapValue} p-2 rounded-xl bg-(--keyboard-bg)`}>
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
                                        <ArrowKeys />
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