import { TARGETS } from "@/configs/targets.config";
import type { Score } from "@/state/GameReducer";
import type { GameEvent, TargetEmoji } from "@/types/targets.type";

async function copyToClipboard(text: string) {
    try{
       await navigator.clipboard.writeText(text);
       return true
    }
    catch(err){
        console.error(err);
        return false
    }
}

export default async function returnTextResult(score: Score, difficulty: string, gameEventSequence: GameEvent[]) : Promise<[boolean, string]> {
    const {targetsHit, targetsMissed, bombsHit} = score;
    const total = targetsHit+targetsMissed+bombsHit;

    if(total===0) 
        return [true, ''];

    const createEmojiSequence = () => {
        const seq : Array<TargetEmoji> = gameEventSequence.map(ev =>
            Object.values(TARGETS).find(tp => tp.gameSequenceEvent===ev)?.emoji || '❌'
        )
        return seq;
    }

    const emojiGrid = createEmojiSequence()
                        .reduce((result, emoji, i) => {
                            return result + emoji + ((i + 1) % 5 === 0 && i!==total-1 ? '\n' : '');
                        }, '');

    const scoreDetails = `
    ${targetsHit} HIT 🎯
    ${bombsHit} BOMBS 💣
    ${targetsMissed} MISSED ❌
    `

    const header = 
    `⌨️ *KEYBOARD SMASH - ${difficulty.toUpperCase()}*`

    const footer = 
    `Think you can smash this?
    https://keyboard-smash-game.vercel.app
    `

    const message = `
    ${header}

    ${emojiGrid}
    ${scoreDetails}
    ${footer}
    `
    .split('\n')
    .map(line => line.trim())
    .join('\n')
    .trim();

    const copyMessage = await copyToClipboard(message);
    if(copyMessage) return [true, message];
    else return [false, ''];
}