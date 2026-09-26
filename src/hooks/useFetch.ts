import { useCallback, useEffect, useRef, useState } from "react";
import type { ResponseJsonBody } from "shared/types/shared.types";

export default function useFetch<T>(
    endPoint: string,
    options: RequestInit = {},
    auto: boolean = false
) {
    const [data, setData] = useState<ResponseJsonBody<T>>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ResponseJsonBody<T>>();
    const controllerRef = useRef<AbortController | null>(null);

    const fetchData = useCallback(async () => 
        {
            if(controllerRef.current) controllerRef.current.abort();
            const controller = new AbortController();
            controllerRef.current = controller;

            setLoading(true);
            try{
                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}${endPoint}`,
                    {
                        // default options here,
                        method: "GET",
                        signal: controllerRef.current.signal,

                        // options arg
                        ...options,
                        headers: {
                            "Content-Type": "application/json",
                            ...options.headers
                        }
                    }
                )
                const result = (await response.json()) as ResponseJsonBody<T>;
                if(response.ok){
                    setData(result);
                }
                else {
                    setError(result);
                }
            }
            catch(e){
                if(e instanceof DOMException && e.name==="AbortError")
                    return

                setError({
                    message: "An unknown error occured",
                    result: {
                        error: e
                    }
                })
            }
            finally {
                setLoading(false);
            }
        }, [endPoint, options])

    useEffect(() => {
        if(auto) fetchData();
        return () => {
            if(controllerRef.current)
                controllerRef.current.abort()
        }
    },[fetchData, auto]);

    return {data, loading, error, execute: fetchData}
}