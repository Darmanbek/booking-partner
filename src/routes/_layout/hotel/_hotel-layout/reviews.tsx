import { createFileRoute } from "@tanstack/react-router"
import { HotelReviewsPage } from "src/pages/hotel-reviews"

export const Route = createFileRoute("/_layout/hotel/_hotel-layout/reviews")({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<HotelReviewsPage />{" "}
		</>
	)
}
