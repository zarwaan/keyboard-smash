import { useAuth } from "../AuthBoxProvider";
import NavButton from "./NavButton";

export interface INavButton {
    label: string,
    buttonPos: number,
    onclick: () => void
}

export default function NavBar({}) {
    const nav = useAuth();
    const NavButtonConfig : Record<typeof nav.view, INavButton>
     = {
        login: {
            label: "Login",
            buttonPos: 0,
            onclick: nav.setLoginView
        },
        register: {
            label: "Register",
            buttonPos: 1,
            onclick: nav.setRegisterView
        }
    }
    // useEffectLog(nav);
    return (
        <div className="bord flex flex-row m-auto rounded-lg bg-(--full-white) p-px relative border-[0.5px] border-black">
            {
                (Object.keys(NavButtonConfig) as typeof nav.view[]).map((button, index)=>{
                    return(
                        <NavButton button={NavButtonConfig[button]} key={index}></NavButton>
                    )
                })
            }
        </div>
    )
}