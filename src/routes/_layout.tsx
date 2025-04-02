import { createFileRoute, Outlet } from "@tanstack/react-router"
import {
	Footer,
	Header,
	InnerLayout,
	MainContent,
	MainLayout,
	Sidebar
} from "src/shared/layout"
import { Menubar } from "src/shared/layout/menubar"

export const Route = createFileRoute("/_layout")({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<MainLayout>
			<Sidebar />
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
