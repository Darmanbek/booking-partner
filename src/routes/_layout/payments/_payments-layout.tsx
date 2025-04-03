import { createFileRoute, Outlet } from "@tanstack/react-router"
import type { MenuItemType } from "antd/es/menu/interface"
import { NavigationContainer } from "src/widgets/navigation-container"

export const Route = createFileRoute("/_layout/payments/_payments-layout")({
	component: RouteComponent
})

const items: MenuItemType[] = [
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

function RouteComponent() {
	return (
		<NavigationContainer
			menuProps={{
				items
			}}
		>
			<Outlet />
		</NavigationContainer>
	)
}
