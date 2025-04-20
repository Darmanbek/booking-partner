import type { GetParams, ParamId } from "src/services/shared"
import { useCrudMutation, useCrudQuery } from "src/shared/api"
import { chessboardService } from "./chessboard.service"
import type { ChessboardChange } from "./chessboard.types"

const useGetChessboardQuery = (hotelSlug: ParamId, params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => chessboardService.get(hotelSlug, params),
		queryKey: ["chessboard", hotelSlug, ...Object.values(params)],
		enabled: !!hotelSlug
	})
}

const useGetChessboardActiveBookingsQuery = (
	hotelSlug: ParamId,
	params: GetParams = {}
) => {
	return useCrudQuery({
		queryFn: () => chessboardService.getActiveBookings(hotelSlug, params),
		queryKey: [
			"chessboard",
			hotelSlug,
			"active-bookings",
			...Object.values(params)
		],
		enabled: !!hotelSlug
	})
}

const useCreateChessboardMutation = (hotelSlug: ParamId) => {
	return useCrudMutation({
		mutationFn: (form: ChessboardChange) =>
			chessboardService.create(hotelSlug, form),
		invalidate: {
			queryKey: ["chessboard", hotelSlug]
		}
	})
}

export {
	useGetChessboardQuery,
	useGetChessboardActiveBookingsQuery,
	useCreateChessboardMutation
}
