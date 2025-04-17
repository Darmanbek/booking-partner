import { createFileRoute, Outlet } from "@tanstack/react-router"
import { MainContent } from "src/shared/layout"
import { Container } from "src/shared/ui"

export const Route = createFileRoute("/_layout/hotels/_hotels-layout")({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<MainContent>
			<Container>
				<Outlet />
			</Container>
		</MainContent>
	)
}
