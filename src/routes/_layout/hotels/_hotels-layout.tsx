import { createFileRoute, Outlet } from "@tanstack/react-router"
import { MainContent } from "src/shared/layout"

export const Route = createFileRoute("/_layout/hotels/_hotels-layout")({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<MainContent>
			<Outlet />
		</MainContent>
	)
}
