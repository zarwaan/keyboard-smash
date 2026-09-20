import { useState } from "react"
import type { DBUser } from "shared/types/shared.types"
import OnBoardingBox from "../utils/OnBoardingBox";
import Header from "../utils/Header";
import InputBox from "../utils/InputBox";
import SubmitButton from "../utils/SubmitButton";

export default function LoginBox({}) {
    const [creds, setCreds] = useState<DBUser>({
        username: "",
        password: ""
    });
    const configs: Record<keyof DBUser, {inputType: React.HTMLInputTypeAttribute, placeholder: string}> = {
        username: {
            inputType: "text",
            placeholder: "Enter your username..."
        },
        password: {
            inputType: "password",
            placeholder: "Enter your password..."
        },
        email: {
            inputType: "email",
            placeholder: "Enter your email (optional)..."
        }
    }
    return (
        <OnBoardingBox>
            <Header g="Welcome Back!" />
            {
                (Object.keys(creds) as (keyof typeof creds)[]).map(c => 
                    <InputBox
                        creds={creds}
                        setCreds={setCreds}
                        inputName={c}
                        placeholder={configs[c].placeholder}
                        inputType={configs[c].inputType}
                    />
                )
            }
            <SubmitButton onClick={()=>{}}/>
        </OnBoardingBox>
    )
}