import { createFileRoute } from "@tanstack/react-router"
import { RoomsNewPage } from "src/pages/rooms-new"

export const Route = createFileRoute(
	"/_layout/hotels/$hotelSlug/_hotel-layout/rooms/$roomId/edit"
)({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<RoomsNewPage isEdit={true} />
		</>
	)
}
