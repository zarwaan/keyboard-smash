export default function Header({g}: {g: string}) {
    return (
        <div className="text-4xl font-(family-name:--header-font) tracking-wider text-indigo-500">
            {g}
        </div>
    )
}