import { useUIContext } from "@/providers/UIProvider"

export default function AuthIcon({loggedIn}: {loggedIn : boolean}) {
    const {openAuth, openProfile} = useUIContext();
    return (
        <button id="instructions-icon" className="border border-(--text-color) bg-indigo-500 p-1 rounded-xl shadow-[3px_3px_0px_var(--text-color)] transform-translate duration-100 ease-in-out
                            active:translate-0.5 active:shadow-none cursor-pointer w-12 h-12 text-(--full-white)"
                onClick={() => {
                    loggedIn? openProfile() : openAuth();
                }}>
                {
                !loggedIn ?
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g> 
                        <path d="M14 4L17.5 4C20.5577 4 20.5 8 20.5 12C20.5 16 20.5577 20 17.5 20H14M15 12L3 12M15 12L11 16M15 12L11 8" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> 
                    </g>
                </svg>
                :
                <svg viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff" className="scale-75">
                    <g id="SVGRepo_iconCarrier"> 
                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="Dribbble-Light-Preview" transform="translate(-180.000000, -2159.000000)" fill="#ffffff"> 
                                <g id="icons" transform="translate(56.000000, 160.000000)"> 
                                    <path d="M134,2008.99998 C131.783496,2008.99998 129.980955,2007.20598 129.980955,2004.99998 C129.980955,2002.79398 131.783496,2000.99998 134,2000.99998 C136.216504,2000.99998 138.019045,2002.79398 138.019045,2004.99998 C138.019045,2007.20598 136.216504,2008.99998 134,2008.99998 M137.775893,2009.67298 C139.370449,2008.39598 140.299854,2006.33098 139.958235,2004.06998 C139.561354,2001.44698 137.368965,1999.34798 134.722423,1999.04198 C131.070116,1998.61898 127.971432,2001.44898 127.971432,2004.99998 C127.971432,2006.88998 128.851603,2008.57398 130.224107,2009.67298 C126.852128,2010.93398 124.390463,2013.89498 124.004634,2017.89098 C123.948368,2018.48198 124.411563,2018.99998 125.008391,2018.99998 C125.519814,2018.99998 125.955881,2018.61598 126.001095,2018.10898 C126.404004,2013.64598 129.837274,2010.99998 134,2010.99998 C138.162726,2010.99998 141.595996,2013.64598 141.998905,2018.10898 C142.044119,2018.61598 142.480186,2018.99998 142.991609,2018.99998 C143.588437,2018.99998 144.051632,2018.48198 143.995366,2017.89098 C143.609537,2013.89498 141.147872,2010.93398 137.775893,2009.67298" id="profile-[#ffffff]"> 
                                    </path> 
                                </g> 
                            </g> 
                        </g> 
                    </g>
                </svg>
                }
        </button>
    )
}

