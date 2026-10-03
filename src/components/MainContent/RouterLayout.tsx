import SettingsBox from "../Settings/SettingsBox";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function RouterLayout() {
    return (
        <div className="border-(--text-color) border- h-[98vh] text-center flex flex-col justify-items-center p-4 relative 
                        main-content gap-10">
            <Header />
            <Outlet />
            <SettingsBox />
        </div>
    )
}

// **:transition-colors **:duration-300