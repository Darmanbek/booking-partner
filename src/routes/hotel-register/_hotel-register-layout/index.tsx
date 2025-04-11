import { createFileRoute } from "@tanstack/react-router"
import { HotelRegisterPage } from "src/pages/hotel-register"

export const Route = createFileRoute("/hotel-register/_hotel-register-layout/")(
	{
		component: RouteComponent
	}
)

function RouteComponent() {
	return (
		<>
			<HotelRegisterPage />
		</>
	)
}
