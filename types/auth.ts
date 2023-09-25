import { User } from "firebase/auth"

export type AuthResponse = {
    isSuccessful: boolean
    error?: string
    user?: User
}