import type {
	GetParams,
	ParamId,
	ResponseData,
	ResponseSingleData
} from "src/services/shared"
import { api } from "src/shared/api"
import type {
	Chessboard,
	ChessboardActiveBooking,
	ChessboardChange
} from "./chessboard.types"

class ChessboardService {
	get = async (
		hotelSlug: ParamId,
		params: GetParams = {}
	): Promise<ResponseData<Chessboard>> => {
		const response = await api.get(`/hotels/${hotelSlug}/chessboard`, {
			params
		})
		return response.data
	}

	getActiveBookings = async (
		hotelSlug: ParamId,
		params: GetParams = {}
	): Promise<ResponseData<ChessboardActiveBooking>> => {
		const response = await api.get(
			`/hotels/${hotelSlug}/chessboard/active-bookings`,
			{
				params
			}
		)
		return response.data
	}

	create = async (
		hotelSlug: ParamId,
		form: ChessboardChange
	): Promise<ResponseSingleData<Chessboard>> => {
		const response = await api.post(
			`/hotels/${hotelSlug}/rooms/${form?.room_id}/chessboard`,
			form
		)
		return response.data
	}
}

export const chessboardService = new ChessboardService()
