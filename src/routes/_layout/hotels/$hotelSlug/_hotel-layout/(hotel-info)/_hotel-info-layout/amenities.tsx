import { createFileRoute } from "@tanstack/react-router"
import { HotelAmenitiesPage } from "src/pages/hotel-amenities"

export const Route = createFileRoute("/_layout/hotels/$hotelSlug/_hotel-layout/(hotel-info)/_hotel-info-layout/amenities")({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<HotelAmenitiesPage />
		</>
	)
}
