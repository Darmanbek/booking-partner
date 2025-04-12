import type { ParamId, ResponseSingleData } from "src/services/shared"
import { api } from "src/shared/api"
import type { Hotel, HotelChange } from "./hotels.types"

class HotelsService {
	get = async (
		params: Record<string, unknown>
	): Promise<ResponseSingleData<Hotel>> => {
		const response = await api.get(`/partners/hotel`, { params })
		return response.data
	}

	create = async (form: HotelChange): Promise<ResponseSingleData<Hotel>> => {
		const response = await api.post(`/hotels`, form)
		return response.data
	}

	edit = async (form: HotelChange): Promise<ResponseSingleData<Hotel>> => {
		const response = await api.put(`/hotels/${form.slug}`, form)
		return response.data
	}

	delete = async (slug: ParamId): Promise<ResponseSingleData<void>> => {
		const response = await api.delete(`/hotels/${slug}`)
		return response.data
	}
}

export const hotelsService = new HotelsService()
