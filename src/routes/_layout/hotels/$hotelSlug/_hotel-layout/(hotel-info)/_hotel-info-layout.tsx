import { createFileRoute, Outlet } from "@tanstack/react-router"
import { NavigationContainer } from "src/widgets/navigation-container"

export const Route = createFileRoute(
	"/_layout/hotels/$hotelSlug/_hotel-layout/(hotel-info)/_hotel-info-layout"
)({
	component: RouteComponent
})

function RouteComponent() {
	const { hotelSlug } = Route.useParams()

	return (
		<NavigationContainer
			menuProps={{
				items: [
					{
						key: `/hotels/${hotelSlug}`,
						label: "Информация"
					},
					{
						key: `/hotels/${hotelSlug}/amenities`,
						label: "Услуги и удобства"
					},
					// {
					// 	key: `/hotels/${hotelSlug}/rules`,
					// 	label: "Условия"
					// },
					{
						key: `/hotels/${hotelSlug}/reviews`,
						label: "Отзывы"
					}
				]
			}}
		>
			<Outlet />
		</NavigationContainer>
	)
}
