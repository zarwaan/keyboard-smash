export default function SectionHeader({title}: {title: string}) {
    return (
        <div className="borde text-(--text-color) text-left">
            <span className="font-bold">{title}</span>
            <hr className="border-t-2" />
        </div>
    )
}