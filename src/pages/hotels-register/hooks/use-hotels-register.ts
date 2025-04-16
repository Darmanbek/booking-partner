import { useContext } from "react"
import { HotelsRegisterContext } from "src/pages/hotels-register/context"

export const useHotelsRegister = () => {
	const hotelsRegister = useContext(HotelsRegisterContext)

	if (!hotelsRegister) {
		throw new Error("Hotel Register context is null")
	}

	return hotelsRegister
}
