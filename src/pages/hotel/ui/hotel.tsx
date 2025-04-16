import { type FC } from "react"
import { HotelImagesCard, HotelInfoCard } from "./cards"
import { HotelInfoForm } from "./forms"

const Hotel: FC = () => {
	return (
		<>
			<HotelInfoForm />
			<HotelInfoCard />
			<HotelImagesCard />
		</>
	)
}

export { Hotel }
