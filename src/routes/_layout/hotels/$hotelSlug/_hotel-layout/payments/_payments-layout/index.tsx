import { createFileRoute } from "@tanstack/react-router"
import { PaymentsPage } from "src/pages/payments"

export const Route = createFileRoute("/_layout/hotels/$hotelSlug/_hotel-layout/payments/_payments-layout/")({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<PaymentsPage />
		</>
	)
}
