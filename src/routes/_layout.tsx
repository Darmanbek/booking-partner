import { createFileRoute, Outlet } from "@tanstack/react-router"
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
