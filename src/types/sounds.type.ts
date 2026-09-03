export interface AudioTrackInterface {
    src: string,
    volume: number,
    poolSize: number,
    audioType: "Music" | "Effect",
}