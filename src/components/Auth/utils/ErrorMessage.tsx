import { useAuth } from "../AuthBoxProvider"

export default function ErrorMessage({}) {
    const {errorMessage} = useAuth();
    return (
        <div className="w-8/10 text-center bg-red-300 text-red-800 font-semibold rounded-full self-center">
            {errorMessage}
        </div>
    )
}