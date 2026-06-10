const reg = 7;
const bksp = 100 - 13*reg;
const tab = bksp;
const caps = ((2*reg) + bksp) / 2;
const ret = caps;
const shift = ((3*reg) + bksp) / 2

export const keyLengthConfig = {
    reg: '',
    tab: tab+'%',
    backspace: bksp+'%',
    "caps lock": caps+'%',
    enter: ret+'%',
    shiftleft: shift+'%',
    shiftright: shift+'%',
    space: "35%",
    arrows: '18%'
}

export const QwertyRows = [
    ['esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'Blank'],

    ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace'],

    ['tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],

    ['caps lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', "'", 'enter'],

    ['shiftleft', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'shiftright'],

    ['fn', 'control', 'option', 'command', 'space', 'command', 'option', 'arrows'],
]