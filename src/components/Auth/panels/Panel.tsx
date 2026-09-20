import { useAuth } from "../AuthProvider"
import LoginBox from "./LoginBox";
import RegisterBox from "./RegisterBox";

export default function Panel({}) {
    const {view} = useAuth();
    return (
        <>
            {view==="login" && <LoginBox />}
            {view==="register" && <RegisterBox />}
        </>
    )
}