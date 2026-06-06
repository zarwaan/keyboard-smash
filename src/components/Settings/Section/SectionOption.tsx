export default function SectionOption({children} : {children:React.ReactNode}) {
    return (
        <div className="borde border-purple-500 flex flex-row justify-between first:text-lg">
            {children}
        </div>
    )
}