import { useContext } from "react"
import { RoomsNewContext } from "../context"

export const useRoomsNew = () => {
	const roomsNew = useContext(RoomsNewContext)

	if (!roomsNew) {
		throw new Error("Rooms New context is null")
	}

	return roomsNew
}
