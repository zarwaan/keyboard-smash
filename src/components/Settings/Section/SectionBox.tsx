export default function SectionBox({children} : {children: React.ReactNode}) {
    return (
        <div className="border flex border-red-500 flex-col gap-0.75">
            {children}
        </div>
    )
}