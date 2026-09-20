export default function OnBoardingBox({children}: {children: React.ReactNode}) {
    return (
        <div className="flex flex-col gap-3 pt-1">
            {children}
        </div>
    )
}