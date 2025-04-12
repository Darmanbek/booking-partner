import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"
import { useGetHotelsQuery } from "src/services/hotels"
import { useGetMeQuery } from "src/services/partners"
import { useAuth } from "src/shared/hooks"
import {
	Footer,
	Header,
	InnerLayout,
	MainContent,
	MainLayout,
	Menubar
} from "src/shared/layout"
import { Loader } from "src/widgets/loader"

export const Route = createFileRoute("/_layout")({
	component: RouteComponent
})

function RouteComponent() {
	const navigate = useNavigate()
	const { setHotelSlug, setHasHotel } = useAuth()
	const { data: profile, isLoading } = useGetMeQuery()

	const { data: hotel } = useGetHotelsQuery()

	useEffect(() => {
		if (hotel?.data?.slug) {
			setHotelSlug(hotel?.data?.slug)
		}
	}, [hotel?.data?.slug, setHotelSlug])

	useEffect(() => {
		if (profile?.data?.has_hotel) {
			setHasHotel(profile?.data?.has_hotel)
		}
	}, [profile?.data?.has_hotel, setHasHotel])

	useEffect(() => {
		if (profile?.data?.has_hotel === false) {
			navigate({
				to: "/hotel-register",
				replace: true
			})
		}
	}, [navigate, profile?.data?.has_hotel])
	return (
		<>
			<Loader loading={isLoading} />
			<MainLayout>
				{/*<Sidebar />*/}
				<InnerLayout>
					<Header />
					<Menubar />
					<MainContent>
						<Outlet />
					</MainContent>
					<Footer />
				</InnerLayout>
			</MainLayout>
		</>
	)
}
