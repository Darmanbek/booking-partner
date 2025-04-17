import type {
	GetParams,
	ParamId,
	ResponseData,
	ResponseSingleData
} from "src/services/shared"
import { api } from "src/shared/api"
import type { Booking } from "./bookings.types"

class BookingsService {
	get = async (
		hotelSlug: ParamId,
		params: GetParams = {}
	): Promise<ResponseData<Booking>> => {
		const response = await api.get(`/partners/hotels/${hotelSlug}/bookings`, {
			params
		})
		return response.data
	}

	// getById = async (id: unknown): Promise<ResponseSingleData<void>> => {
	// 	const response = await api.get(`/bookings/${id}`)
	// 	return response.data
	// }

	// create = async (
	// 	form: Record<string, unknown>
	// ): Promise<ResponseSingleData<void>> => {
	// 	const response = await api.post(`/bookings`, form)
	// 	return response.data
	// }

	edit = async (
		form: Record<string, unknown>
	): Promise<ResponseSingleData<void>> => {
		const response = await api.put(`/bookings/${form.id}`, form)
		return response.data
	}

	// delete = async (id: unknown): Promise<ResponseSingleData<void>> => {
	// 	const response = await api.delete(`/bookings/${id}`)
	// 	return response.data
	// }
}

export const bookingsService = new BookingsService()
