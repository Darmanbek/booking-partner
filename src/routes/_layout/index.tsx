import { createFileRoute, Navigate, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_layout/")({
	component: RouteComponent,
	beforeLoad: () => {
		throw redirect({
			to: "/hotel",
			replace: true
		})
	}
})

function RouteComponent() {
	return <Navigate to={"/hotel"} replace={true} />
}
