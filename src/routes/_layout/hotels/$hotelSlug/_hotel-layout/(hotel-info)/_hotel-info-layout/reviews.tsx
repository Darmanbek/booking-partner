import { createFileRoute } from "@tanstack/react-router"
import { HotelReviewsPage } from "src/pages/hotel-reviews"

export const Route = createFileRoute("/_layout/hotels/$hotelSlug/_hotel-layout/(hotel-info)/_hotel-info-layout/reviews")({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<HotelReviewsPage />{" "}
		</>
	)
}
