import { createFileRoute } from "@tanstack/react-router"
import { RoomsNewPage } from "src/pages/rooms-new"

export const Route = createFileRoute("/_layout/rooms/new")({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<RoomsNewPage />
		</>
	)
}
