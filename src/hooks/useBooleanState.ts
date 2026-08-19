import { useState } from 'react';

export default function useBooleanState(initialValue: boolean = false): [
    boolean, () => void, () => void
] {
    const [value, setValue] = useState<boolean>(initialValue);

    const setTrue = () => setValue(true)
    const setFalse = () => setValue(false)

    return [value, setTrue, setFalse];
}