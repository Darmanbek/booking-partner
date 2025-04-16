import { createFileRoute } from "@tanstack/react-router"
import { HotelRulesPage } from "src/pages/hotel-rules"

export const Route = createFileRoute("/_layout/hotels/$hotelSlug/_hotel-layout/(hotel-info)/_hotel-info-layout/rules")({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<HotelRulesPage />
		</>
	)
}
