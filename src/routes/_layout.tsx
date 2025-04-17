import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"
import { Footer, Header, InnerLayout, MainLayout } from "src/shared/layout"

export const Route = createFileRoute("/_layout")({
	component: RouteComponent,
	beforeLoad: ({ context }) => {
		if (!context.auth?.isAuth) {
			throw redirect({
				to: "/auth/login",
				replace: true
			})
		}
	}
})

function RouteComponent() {
	return (
		<>
			<MainLayout>
				<InnerLayout>
					<Header />
					<Outlet />
					<Footer />
				</InnerLayout>
			</MainLayout>
		</>
	)
}
