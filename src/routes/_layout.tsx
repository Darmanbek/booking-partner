import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router"
import { useEffect } from "react"
import { useGetMeQuery } from "src/services/partners"
import {
	Footer,
	Header,
	InnerLayout,
	MainContent,
	MainLayout,
	Menubar
} from "src/shared/layout"

export const Route = createFileRoute("/_layout")({
	component: RouteComponent
})

function RouteComponent() {
	const navigate = useNavigate()
	const { data: profile } = useGetMeQuery()

	useEffect(() => {
		if (!profile?.data?.has_hotel) {
			navigate({
				to: "/hotel-register",
				replace: true
			})
		}
	}, [navigate, profile?.data?.has_hotel])
	return (
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
	)
}
