import { useAuth } from "../AuthProvider";
import type { INavButton } from "./NavBar";
import NavButtonHighlight from "./NavButtonHighlight";

export default function NavButton({button}: {button: INavButton}) {
    const nav = useAuth();
    return (
        <div className="flex-1 box-border">
            <button onClick={button.onclick} className="bor w-25 cursor-pointer relative py-0 outline-none!">
                {
                    button.buttonPos === 0 && <NavButtonHighlight />
                }
                <span className={`z-99 relative transition-all duration-300 ease-out font-semibold 
                    ${nav.pos === button.buttonPos ? "text-(--full-white)" : "text-black"}`}>
                    {button.label}
                </span>
            </button>
        </div>
    )
}