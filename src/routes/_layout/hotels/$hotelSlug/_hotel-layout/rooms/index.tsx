import { createFileRoute } from "@tanstack/react-router"
import { RoomsPage } from "src/pages/rooms"

export const Route = createFileRoute("/_layout/hotels/$hotelSlug/_hotel-layout/rooms/")({
	component: RouteComponent
})

function RouteComponent() {
	return <RoomsPage />
}
