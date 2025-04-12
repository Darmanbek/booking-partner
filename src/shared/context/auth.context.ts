import { createContext } from "react"
import type { Tokens } from "src/services/shared"

export type AuthContextValues = {
	isAuth: boolean
	login: (token: Tokens, remember?: boolean) => void
	logout: () => void
}

export type HotelContextValues = {
	hotelSlug: string | null
	setHotelSlug: (hotelSlug: string) => void
	hasHotel: boolean
	setHasHotel: (hasHotel: boolean) => void
}

export const AuthContext = createContext<AuthContextValues | null>(null)
export const HotelContext = createContext<HotelContextValues | null>(null)
