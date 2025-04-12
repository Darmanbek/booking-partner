import type {
	GetParams,
	ParamId,
	ResponseData,
	ResponseSingleData
} from "src/services/shared"
import { api } from "src/shared/api"
import type {
	Amenity,
	HotelAmenity,
	HotelAmenityChange
} from "./amenities.types"

class AmenitiesService {
	get = async (
		type: "hotel" | "room" = "hotel",
		params: GetParams = {}
	): Promise<ResponseData<Amenity>> => {
		const response = await api.get(`/${type}-amenities`, { params })
		return response.data
	}

	getByHotel = async (
		hotelSlug: ParamId,
		params: GetParams = {}
	): Promise<ResponseData<Amenity>> => {
		const response = await api.get(`/hotels/${hotelSlug}/amenities`, {
			params
		})
		return response.data
	}

	create = async (
		form: HotelAmenityChange
	): Promise<ResponseSingleData<Amenity>> => {
		const response = await api.post(`/hotel-amenities/categories`, form)
		return response.data
	}

	edit = async (
		form: HotelAmenityChange
	): Promise<ResponseSingleData<Amenity>> => {
		const response = await api.put(
			`/hotel-amenities/categories/${form.id}`,
			form
		)
		return response.data
	}

	delete = async (id: ParamId): Promise<ResponseSingleData<void>> => {
		const response = await api.delete(`/hotel-amenities/categories/${id}`)
		return response.data
	}

	createAmenities = async (
		categoryId: ParamId,
		form: HotelAmenityChange
	): Promise<ResponseSingleData<HotelAmenity>> => {
		const response = await api.post(
			`/hotel-amenities/categories/${categoryId}/amenities`,
			form
		)
		return response.data
	}

	editAmenities = async (
		form: Record<string, unknown>
	): Promise<ResponseSingleData<HotelAmenity>> => {
		const response = await api.put(
			`/hotel-amenities/amenities/${form.id}`,
			form
		)
		return response.data
	}

	deleteAmenities = async (id: ParamId): Promise<ResponseSingleData<void>> => {
		const response = await api.delete(`/hotel-amenities/amenities/${id}`)
		return response.data
	}
}

export const amenitiesService = new AmenitiesService()
