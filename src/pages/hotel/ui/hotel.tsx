import { type FC } from "react"
import { HotelImagesCard, HotelInfoCard } from "./cards"
import { HotelImagesForm, HotelInfoForm } from "./forms"

const Hotel: FC = () => {
	return (
		<>
			<HotelInfoForm />
			<HotelInfoCard />
			<HotelImagesForm />
			<HotelImagesCard />
		</>
	)
}

export { Hotel }
