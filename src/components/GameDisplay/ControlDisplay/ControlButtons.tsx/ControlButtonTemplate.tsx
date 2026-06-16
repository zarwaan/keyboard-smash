export default function ControlButtonTemplate({label, onClickAction} : {
    label: string,
    onClickAction: () => void
}) {
    return (
        <button className="text-(--text-color) theme-transition rounded-full text-xl px-3 py-1 border cursor-pointer" onClick={onClickAction}>
            {label}
        </button>
    )
}