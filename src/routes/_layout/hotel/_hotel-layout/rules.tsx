import { createFileRoute } from "@tanstack/react-router"
import { HotelRulesPage } from "src/pages/hotel-rules"

export const Route = createFileRoute("/_layout/hotel/_hotel-layout/rules")({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<HotelRulesPage />
		</>
	)
}
