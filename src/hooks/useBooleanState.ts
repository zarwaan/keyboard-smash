import { useState } from 'react';
import usePersistentState, { initSettings } from './usePersistentState';

export default function useBooleanState(
    initialValue: boolean = false, 
    persistOptions: {
        persist: boolean,
        persistKey: keyof typeof initSettings | undefined
    } = {
        persist: false,
        persistKey: undefined
    }
) : 
[
    boolean, () => void, () => void
] 
{

    const [value, setValue] = 
    persistOptions.persist && persistOptions.persistKey ?
    usePersistentState<boolean>(persistOptions.persistKey, initialValue)
    :
    useState<boolean>(initialValue)


    const setTrue = () => setValue(true)
    const setFalse = () => setValue(false)

    return [value, setTrue, setFalse];
}