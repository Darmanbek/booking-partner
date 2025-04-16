import { createFileRoute } from "@tanstack/react-router"
import { HotelPage } from "src/pages/hotel"

export const Route = createFileRoute("/_layout/hotels/$hotelSlug/_hotel-layout/(hotel-info)/_hotel-info-layout/")({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<HotelPage />
		</>
	)
}
