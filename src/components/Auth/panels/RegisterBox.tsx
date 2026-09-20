import { useState } from "react"
import type { DBUser } from "shared/types/shared.types"
import OnBoardingBox from "../utils/OnBoardingBox";
import Header from "../utils/Header";
import InputBox from "../utils/InputBox";
import SubmitButton from "../utils/SubmitButton";
import ErrorMessage from "../utils/ErrorMessage";
import { useAuth } from "../AuthProvider";

type RegisterCreds = DBUser & {
    confirmPass: string
}

export default function RegisterBox({}) {
    const {errorMessage} = useAuth();
    const [creds, setCreds] = useState<RegisterCreds>({
        username: "",
        password: "",
        confirmPass: "",
        email: undefined,
    });
    const configs: Record<keyof RegisterCreds, {inputType: React.HTMLInputTypeAttribute, placeholder: string}> = {
        username: {
            inputType: "text",
            placeholder: "Enter your username..."
        },
        password: {
            inputType: "password",
            placeholder: "Enter your password..."
        },
        confirmPass: {
            inputType: "password",
            placeholder: "Confirm password..."
        },
        email: {
            inputType: "email",
            placeholder: "Enter your email (optional)..."
        },
    }
    return (
        <OnBoardingBox>
            <Header g="Join us!" />
            {
                (Object.keys(creds) as (keyof typeof creds)[]).map(c => 
                    <InputBox
                        creds={creds}
                        setCreds={setCreds}
                        inputName={c}
                        placeholder={configs[c].placeholder}
                        inputType={configs[c].inputType}
                        key={`register-${c}`}
                    />
                )
            }
            { errorMessage && <ErrorMessage />}
            {/* <SubmitButton onClick={()=>{}}/> */}
        </OnBoardingBox>
    )
}