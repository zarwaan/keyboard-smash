export default function SectionHeader({title}: {title: string}) {
    return (
        <div className="borde text-(--text-color) text-left theme-transition">
            <span className="font-bold text-lg">{title}</span>
            <hr className="border-t-2" />
        </div>
    )
}