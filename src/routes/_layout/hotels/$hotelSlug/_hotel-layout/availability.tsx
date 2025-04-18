import { createFileRoute } from "@tanstack/react-router"
import { AvailabilityPage } from "src/pages/availability"

export const Route = createFileRoute(
	"/_layout/hotels/$hotelSlug/_hotel-layout/availability"
)({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<AvailabilityPage />
		</>
	)
}
