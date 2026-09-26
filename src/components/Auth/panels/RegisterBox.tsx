import { useState } from "react"
import type { DBUser } from "shared/types/shared.types"
import { usernameCheck } from "shared/helpers/validationChecks"
import OnBoardingBox from "../utils/OnBoardingBox";
import Header from "../utils/Header";
import InputBox from "../utils/InputBox";
import SubmitButton from "../utils/SubmitButton";
import ErrorMessage from "../utils/ErrorMessage";
import { useAuth } from "../AuthBoxProvider";
import stringifyCreds from "../helpers/stringifyCreds";

type RegisterCreds = DBUser & {
    confirmPass: string
}

export default function RegisterBox({}) {
    const {errorMessage, setErrorMessage} = useAuth();
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

    const checkAndSanitise = () : boolean => {
        const check = usernameCheck(creds.username);
        if(!check.valid){
            setErrorMessage(check.message)
            return false
        }
        if(creds.password !== creds.confirmPass){
            setErrorMessage("Passwords don't match!")
            return false
        }
        return true
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
            <SubmitButton props={[
                "/auth/signup",
                {
                    method: "POST",
                    credentials: "include",
                    body: stringifyCreds<Omit<RegisterCreds, "confirmPass">>({
                        username: creds.username.trim().toLowerCase(),
                        password: creds.password,
                        email: creds.email
                    })
                },
                false
            ]} checkAndSanitise={checkAndSanitise}/>
        </OnBoardingBox>
    )
}
