import type { Score } from "@/state/GameReducer";

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

export default async function returnTextResult(score: Score, difficulty: string) {
    const {targetsHit, targetsMissed, bombsHit} = score;
    const total = targetsHit+targetsMissed+bombsHit;

    if(total===0) return [true, ''];

    const createRandomEmojiSequence = () => {
        const EmojiSequence: Array<'🎯'|'❌'|'💣'> = 
        new Array(total)
            .fill('💣')
            .fill('🎯',0,targetsHit)
            .fill('❌',targetsHit,targetsHit+targetsMissed);

        return [...EmojiSequence].sort(() => Math.random() - 0.5)
    }

    const emojiGrid = createRandomEmojiSequence()
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