import type { IUserSessionDetails } from'./shared.types'

export interface ILoginDetails {
    loggedIn: boolean,
    userDetails: IUserSessionDetails | null
}