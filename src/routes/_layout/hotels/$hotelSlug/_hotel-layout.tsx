import { createFileRoute, Outlet } from "@tanstack/react-router"
import { MainContent, Menubar } from "src/shared/layout"

export const Route = createFileRoute("/_layout/hotels/$hotelSlug/_hotel-layout")({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<Menubar />
			<MainContent>
				<Outlet />
			</MainContent>
		</>
	)
}
