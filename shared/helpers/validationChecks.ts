export function usernameCheck(username: string) : {valid: boolean, message: string} {
    if(username.trim().length < 3)
        return {
            valid: false,
            message: "Username must be atleast three characters!"
        }
    if(!/^[A-Za-z0-9_]+$/.test(username))
        return {
            valid: false,
            message: "Username can only contain letters, numbers and underscores!"
        }
    return {
        valid: true,
        message: ""
    }
}