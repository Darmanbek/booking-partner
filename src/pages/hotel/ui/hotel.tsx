import { type FC } from "react"
import { HotelImagesCard, HotelInfoCard } from "./cards"

const Hotel: FC = () => {
	return (
		<>
			<HotelInfoCard />
			<HotelImagesCard />
		</>
	)
}

export { Hotel }
