import useFetch from "@/hooks/useFetch"
import { useUIContext } from "@/providers/UIProvider"
import { motion } from "motion/react"
import { useAuth } from "../AuthBoxProvider"
import { useEffect } from "react";
import type { ILoginDetails } from "shared/types/auth.types"
import { useGlobalAuthContext } from "@/providers/AuthProvider";

export default function SubmitButton({props, checkAndSanitise = () => true}: {props: Parameters<typeof useFetch>, checkAndSanitise?: () => boolean}) {
    const {createToast, closeAuth} = useUIContext();
    const {setErrorMessage} = useAuth();
    const {data, loading, error, execute} = useFetch<ILoginDetails>(...props);
    const {loggedIn, login} = useGlobalAuthContext();
    const onClick = () => {
        if(loading) return;
        if(!checkAndSanitise()) return;
        if(loggedIn) return
        execute();
    }
    useEffect(() => {
        if(data && data.result.content?.userDetails) {
            setErrorMessage(null);
            createToast({
                type: "SUCCESS",
                label: "Logged in successfully!"
            });
            login(data.result.content?.userDetails)
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