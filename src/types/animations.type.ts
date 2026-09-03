export interface AnimationProperties {
    src: string,
    className: string,
    speed?: number
}

export type AnimationKind = 'targeting' | 'effect'

export type AnimationValues = Record<AnimationKind,AnimationProperties>