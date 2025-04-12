import { useContext } from "react"
import { AuthContext, HotelContext } from "src/shared/context"

export const useAuth = () => {
	const auth = useContext(AuthContext)
	const hotel = useContext(HotelContext)
	if (!auth) {
		throw new Error("useAuth must be used within an AuthProvider")
	}
	if (!hotel) {
		throw new Error("useHotel must be used within an HotelProvider")
	}
	return { ...auth, ...hotel }
}
