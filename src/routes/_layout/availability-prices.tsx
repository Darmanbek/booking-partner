import { createFileRoute } from "@tanstack/react-router"
import { AvailabilityPricesPage } from "src/pages/availability-prices"

export const Route = createFileRoute("/_layout/availability-prices")({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<AvailabilityPricesPage />
		</>
	)
}
