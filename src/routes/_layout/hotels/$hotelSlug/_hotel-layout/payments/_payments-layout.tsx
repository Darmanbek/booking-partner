import { createFileRoute, Outlet } from "@tanstack/react-router"
import { NavigationContainer } from "src/widgets/navigation-container"

export const Route = createFileRoute(
	"/_layout/hotels/$hotelSlug/_hotel-layout/payments/_payments-layout"
)({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<NavigationContainer
			menuProps={{
				items: [
					{
						key: "/payments",
						label: "Юридическая информация"
					},
					{
						key: "/payments/scores",
						label: "Счета"
					},
					{
						key: "/payments/create-contract",
						label: "Создать контракт"
					},
					{
						key: "/payments/reconciliation",
						label: "Сверка"
					}
				]
			}}
		>
			<Outlet />
		</NavigationContainer>
	)
}
