import useFetch from "@/hooks/useFetch"
import { useUIContext } from "@/providers/UIProvider"
import { motion } from "motion/react"
import { useAuth } from "../AuthProvider"
import { useEffect } from "react";

export default function SubmitButton({props}: {props: Parameters<typeof useFetch>}) {
    const {createToast, closeAuth} = useUIContext();
    const {setErrorMessage} = useAuth();
    const {data, loading, error, execute} = useFetch(...props);
    const onClick = () => {
        if(loading) return;
        execute();
    }
    useEffect(() => {
        if(data) {
            setErrorMessage(null);
            createToast({
                type: "SUCCESS",
                label: "Logged in successfully!"
            });
            closeAuth();
        }
    }, [data]);

    useEffect(() => {
        if(error) {
            setErrorMessage(error.message)
            console.error(error.result)
        }
    },[error])
    return (
        <motion.button className={`rounded-full px-2 py-1 bg-indigo-600 w-3/10 text-(--full-white) self-center cursor-pointer`}
            onClick={onClick}
            whileTap={{
                scale: 0.95
            }}
            disabled={loading}
        >
            {loading ? "Loading..." : "Submit"}
        </motion.button>
    )
}