import { useState } from "react"
import {AnimatePresence, motion} from "motion/react"

export interface dropdownOptionType<T> {
    label: string,
    value: T
}

export default function Dropdown<T>({optionList, onOptionSelect, selectedOption}: 
    {optionList: dropdownOptionType<T>[], onOptionSelect: (_: T) => void, selectedOption: T}) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const closeDropdown = () => setDropdownOpen(false);
    return (
        <>
        <div className="theme-transition bg-gray-400/30 w-full py-1 px-2 rounded-lg flex justify-between cursor-pointer relative"
        onClick={() => setDropdownOpen(prev => !prev)}>
            <span>{optionList.find(o => o.value === selectedOption)?.label}</span>
            <motion.span animate={{
                rotate: dropdownOpen ? 180 : 0
            }}
            transition={{ duration: 0.2 , ease: "linear"}}
            >
                ▼
            </motion.span>

            <AnimatePresence>
                { 
                    dropdownOpen && 
                    <List optionList={optionList} onOptionSelect={onOptionSelect} closeDropdown={closeDropdown}/>   
                }
            </AnimatePresence>
        </div>
        </>
    )
}

function List<T>({optionList, onOptionSelect, closeDropdown}: 
    {optionList: dropdownOptionType<T>[], onOptionSelect: (_: T) => void, closeDropdown: () => void}) {
    return (
        <motion.div className={`theme-transition bg-(--bg-color) w-full rounded-lg absolute left-0 top-[calc(100%+4px)] border border-(--keyboard-border-color)`}
        onClick={(e) => {e.stopPropagation()}}
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        exit={{ opacity: 0, scaleY: 0 }}
        transition={{ duration: 0.2, ease: "linear" }}
        style={{ transformOrigin: "top" }}>
            <div className="w-full h-full bg-gray-400/30 rounded-lg flex flex-col gap-1 p-1.25">
                {
                    optionList.map((option, _) => 
                        <Option option={option} key={option.label+option.value} onOptionSelect={onOptionSelect} closeDropdown={closeDropdown}/>
                    )
                }
            </div>
        </motion.div>
    )
}

function Option<T>({option, onOptionSelect, closeDropdown}: 
    {option: dropdownOptionType<T>, onOptionSelect: (_: T) => void, closeDropdown: () => void}) {
    return (
        <div className="w-full theme-transition py-1 px-2 hover:bg-indigo-500 rounded-md duration-100 hover:text-(--full-white)"
        onClick={() => {
            onOptionSelect(option.value);
            closeDropdown();
        }}
        >
            {option.label}
        </div>
    )
}