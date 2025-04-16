import { createFileRoute, Outlet } from "@tanstack/react-router"
import { Footer, Header, InnerLayout, MainLayout } from "src/shared/layout"

export const Route = createFileRoute("/_layout")({
	component: RouteComponent
})

function RouteComponent() {
	// const navigate = useNavigate()
	// const { setHotelSlug, setHasHotel } = useAuth()
	// const { data: profile, isLoading } = useGetMeQuery()
	//
	// const { data: hotel } = useGetHotelsQuery()
	//
	// useEffect(() => {
	// 	if (hotel?.data?.slug) {
	// 		setHotelSlug(hotel?.data?.slug)
	// 	}
	// }, [hotel?.data?.slug, setHotelSlug])
	//
	// useEffect(() => {
	// 	if (profile?.data?.has_hotel) {
	// 		setHasHotel(profile?.data?.has_hotel)
	// 	}
	// }, [profile?.data?.has_hotel, setHasHotel])
	//
	// useEffect(() => {
	// 	if (profile?.data?.has_hotel === false) {
	// 		navigate({
	// 			to: "/hotel-register",
	// 			replace: true
	// 		})
	// 	}
	// }, [navigate, profile?.data?.has_hotel])
	return (
		<>
			{/*<Loader loading={isLoading} />*/}
			<MainLayout>
				{/*<Sidebar />*/}
				<InnerLayout>
					<Header />
					<Outlet />
					<Footer />
				</InnerLayout>
			</MainLayout>
		</>
	)
}
