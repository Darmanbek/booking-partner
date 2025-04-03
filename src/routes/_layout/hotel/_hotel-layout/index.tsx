import { createFileRoute } from "@tanstack/react-router"
import { HotelPage } from "src/pages/hotel"

export const Route = createFileRoute("/_layout/hotel/_hotel-layout/")({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<HotelPage />
		</>
	)
}
