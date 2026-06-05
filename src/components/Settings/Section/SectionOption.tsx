export default function SectionOption({children} : {children:React.ReactNode}) {
    return (
        <div className="bordr border-green-500 flex flex-row justify-between">
            {children}
        </div>
    )
}