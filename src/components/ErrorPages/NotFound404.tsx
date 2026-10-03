export default function NotFound404({}) {
    return (
        <div className="text-(--text-color) w-2/10 self-center flex flex-col">
            <div className="flex flex-row">
                <div className="grow" />
                <div className="text-6xl w-5/10 rotate-15">
                    ?
                </div>
            </div>
            <div className="-mt-7">
                <img src="/logo/mole.png" className="w-full"/>
            </div>
        </div>
    )
}