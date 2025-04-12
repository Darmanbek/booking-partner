import { useContext } from "react"
import { HotelRegisterContext } from "src/pages/hotel-register/context"

export const useHotelRegister = () => {
	const hotelRegister = useContext(HotelRegisterContext)

	if (!hotelRegister) {
		throw new Error("Hotel Register context is null")
	}

	return hotelRegister
}
