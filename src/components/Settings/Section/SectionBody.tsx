export default function SectionBody({children} : {children: React.ReactNode}) {
    return (
        <div className="borde border-blue-500 flex flex-col text-left gap-0.75">
            {children}
        </div>
    )
}