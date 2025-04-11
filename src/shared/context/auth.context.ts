import { createContext } from "react"
import { Tokens } from "src/services/shared"

export type AuthContextValues = {
	isAuth: boolean
	login: (token: Tokens, remember?: boolean) => void
	logout: () => void
}

export const AuthContext = createContext<AuthContextValues | null>(null)
