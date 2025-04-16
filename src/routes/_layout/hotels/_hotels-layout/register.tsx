import { createFileRoute } from "@tanstack/react-router"
import { HotelsRegisterPage } from "src/pages/hotels-register"

export const Route = createFileRoute("/_layout/hotels/_hotels-layout/register")({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<HotelsRegisterPage />
		</>
	)
}
