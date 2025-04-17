import { createFileRoute } from "@tanstack/react-router"
import { RoomPage } from "src/pages/room"

export const Route = createFileRoute(
	"/_layout/hotels/$hotelSlug/_hotel-layout/rooms/$roomId/"
)({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<RoomPage />
		</>
	)
}
