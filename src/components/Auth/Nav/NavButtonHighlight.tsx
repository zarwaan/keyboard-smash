import { useAuthNav } from "./AuthNavProvider";

export default function NavButtonHighlight({}) {
    const nav = useAuthNav();
    return (
        <div className="absolute w-full h-full top-0 transition-all duration-300 ease-out flex justify-center items-center" 
        id="button-highlight"
        style={{left: `${nav.pos * 100}%`}}>
            <div className="w-full h-full bg-indigo-600 rounded-lg"></div>
        </div>
    )
}