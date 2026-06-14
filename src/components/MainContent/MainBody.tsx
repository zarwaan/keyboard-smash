export default function MainBody({children} : {children: React.ReactNode}) {
    return (
        <div className="w-full bordr border-green-500 flex flex-center flex-col gap-10">
            {children}
        </div>
    )
}