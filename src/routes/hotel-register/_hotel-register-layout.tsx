import { createFileRoute, Outlet } from "@tanstack/react-router"
import { Footer, Header, InnerLayout, MainContent } from "src/shared/layout"

export const Route = createFileRoute("/hotel-register/_hotel-register-layout")({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<InnerLayout>
				<Header />
				<MainContent>
					<Outlet />
				</MainContent>
				<Footer />
			</InnerLayout>
		</>
	)
}
