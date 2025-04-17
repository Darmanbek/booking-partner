import { type FC } from "react"
import { RoomAmenitiesCard, RoomImagesCard, RoomInfoCard } from "./cards"

const Room: FC = () => {
	return (
		<>
			<RoomInfoCard />
			<RoomImagesCard />
			<RoomAmenitiesCard />
		</>
	)
}

export { Room }
