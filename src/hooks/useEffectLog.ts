import { useEffect } from "react";

export default function useEffectLog(dep: any) {
    useEffect(() => { console.log(dep) }, [dep])
}