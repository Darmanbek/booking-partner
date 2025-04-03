import { createFileRoute, Outlet } from "@tanstack/react-router"
import type { MenuItemType } from "antd/es/menu/interface"
import { NavigationContainer } from "src/widgets/navigation-container"

export const Route = createFileRoute("/_layout/hotel/_hotel-layout")({
	component: RouteComponent
})

const items: MenuItemType[] = [
	{
		key: "/hotel",
		label: "Информация"
	},
	{
		key: "/hotel/amenities",
		label: "Услуги и удобства"
	},
	{
		key: "/hotel/rules",
		label: "Условия"
	},
	{
		key: "/hotel/reviews",
		label: "Отзывы"
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
