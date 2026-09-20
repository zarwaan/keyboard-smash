import { useState } from "react"
import passHide from "@/assets/images/pass-hide.png"
import passShow from "@/assets/images/pass-show.png"

export default function InputBox<T>({
    setCreds, creds, inputName, placeholder, inputType
}: {
    creds: T,
    setCreds: React.Dispatch<React.SetStateAction<T>>,
    inputName: keyof T,
    placeholder: string,
    inputType: React.HTMLInputTypeAttribute,
}) {

    const [showPass, setShowPass] = useState(false);

    const EyeIcon = () => 
        <button className="h-8/10 aspect-square cursor-pointer" onClick={() => setShowPass(prev => !prev)}>
            <img src={showPass ? passShow : passHide} alt=""/>
        </button>
    
    return (
        <div className="w-full relative">
            <input className="border-[0.5px] border-black rounded-xl w-full px-3 py-1 bg-(--full-white) text-black outline-none! relative
            "
            type={inputType==="password" ? showPass ? "text" : "password" : inputType}
            value={creds[inputName] as string}
            onChange={(e) => {
                setCreds(prev => ({
                    ...prev,
                    [inputName]: e.target.value
                }))
            }}
            placeholder={placeholder}
            />
            {
                inputType==="password" &&
                <div className="absolute top-0 right-2 text-black h-full flex-center">
                    <EyeIcon />
                </div>
            }
        </div>
    )
}