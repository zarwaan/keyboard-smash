import { TARGETS } from "@/configs/targets.config";

export type TargetType = keyof typeof TARGETS;
export type TargetKind = typeof TARGETS[TargetType]['kind'];
export type GameEvent = typeof TARGETS[TargetType]['gameSequenceEvent'] | "MISS_EVENT";
export type TargetEmoji = typeof TARGETS[TargetType]['emoji'] | '❌';
export type SoundEffectKey = typeof TARGETS[TargetType]['soundEffect'];
export type TargetLabel = typeof TARGETS[TargetType]['label'];

type KeysMatching<T, Condition> = {
  [K in keyof T]: T[K] extends Condition ? K : never
}[keyof T];

export type HitType = KeysMatching<typeof TARGETS, {kind: 'hit'}>
export type BombType = KeysMatching<typeof TARGETS, {kind: 'bomb'}>
export type PowerUpType = KeysMatching<typeof TARGETS, {kind: 'powerup'}>