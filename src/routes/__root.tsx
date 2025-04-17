import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import {
	createRootRouteWithContext,
	Outlet,
	useRouterState
} from "@tanstack/react-router"
import type { AuthContextValues } from "src/shared/context"
import { Loader } from "src/widgets/loader"

export const Route = createRootRouteWithContext<{
	auth?: AuthContextValues
}>()({
	component: RootComponent
})

function RootComponent() {
	const isLoading = useRouterState({ select: (s) => s.status === "pending" })
	return (
		<>
			<Loader loading={isLoading} />
			<Outlet />
			<ReactQueryDevtools buttonPosition={"bottom-left"} />
		</>
	)
}
