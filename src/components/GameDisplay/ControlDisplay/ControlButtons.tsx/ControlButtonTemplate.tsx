type ButtonLabels = 'Pause' | 'Resume' | 'Start' | 'Reset'

const BUTTON_COLORS: Record<ButtonLabels, string> = {
    Resume: 'bg-indigo-700',
    Pause: 'bg-indigo-700',
    Start: 'bg-green-800',
    Reset: 'bg-red-800'
};

export default function ControlButtonTemplate({label, onClickAction} : {
    label: ButtonLabels,
    onClickAction: () => void
}) {
    const bgColor = BUTTON_COLORS[label];
    return (
        <button className={`text-(--full-white) theme-transition rounded-full text-xl px-5 py-1 cursor-pointer ${bgColor}
        rounded-xl shadow-[3px_3px_0px_var(--text-color)] transform-translate duration-100 ease-in-out
                            active:translate-0.5 active:shadow-none`} onClick={onClickAction}>
            {label}
        </button>
    )
}