import { createFileRoute } from "@tanstack/react-router"
import { HotelAmenitiesPage } from "src/pages/hotel-amenities"

export const Route = createFileRoute("/_layout/hotel/_hotel-layout/amenities")({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<HotelAmenitiesPage />
		</>
	)
}
