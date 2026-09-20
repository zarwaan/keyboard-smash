import { useAuthNav } from "../Nav/AuthNavProvider"
import LoginBox from "./LoginBox";
import RegisterBox from "./RegisterBox";

export default function Panel({}) {
    const {view} = useAuthNav();
    return (
        <>
            {view==="login" && <LoginBox />}
            {view==="register" && <RegisterBox />}
        </>
    )
}