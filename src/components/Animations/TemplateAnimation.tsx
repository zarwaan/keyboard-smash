export interface EffectAndTargetAnimation {
    src: string,
    className: string
}

export default function TemplateAnimation({src, className} : EffectAndTargetAnimation) {
    if(!src) return;
    return (
            <video autoPlay loop muted playsInline className={className}>
                <source src={src} type="video/webm" />
                Your browser does not support the video tag.
            </video>
    )
}