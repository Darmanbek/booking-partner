import { MatchRoute } from "@tanstack/react-router"
import { type FC } from "react"
import type { FileRoutesByTo } from "src/routeTree.gen"
import { Loader } from "src/widgets/loader"

interface MatchLoadingProps {
	to: keyof FileRoutesByTo
}

const MatchLoading: FC<MatchLoadingProps> = ({ to }) => {
	return (
		<>
			<MatchRoute to={to} pending={true}>
				{(params) => <Loader loading={!!params} />}
			</MatchRoute>
		</>
	)
}

export { MatchLoading }
