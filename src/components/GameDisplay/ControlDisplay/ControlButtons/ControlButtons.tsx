import useControlButtonConfig, { type ButtonLabel, type ControlButton } from "@/configs/controlButtons.config"
import type { JSX } from "react"

function ControlButtonTemplate({buttonConfig} : {buttonConfig : ControlButton}) {
    return (
        <button className={`text-(--full-white) theme-transition rounded-full text-xl px-5 py-1 cursor-pointer ${buttonConfig.bgColor}
        rounded-xl shadow-[3px_3px_0px_var(--text-color)] transform-translate duration-100 ease-in-out
                            active:translate-0.5 active:shadow-none`} onClick={buttonConfig.onClickAction}>
            {buttonConfig.label}
        </button>
    )
}

export default function ControlButtons() :
    Record<ButtonLabel,JSX.Element> 
{
    const buttonConfigs = useControlButtonConfig();
    const buttons : Record<ButtonLabel,JSX.Element>  = {} as Record<ButtonLabel,JSX.Element> ;
    (Object.keys(buttonConfigs) as ButtonLabel[]).forEach((key) => {
        const config = buttonConfigs[key];
        buttons[key] = <ControlButtonTemplate buttonConfig={config} />
    });
    return buttons
}