import type { Amenity } from "src/services/amenities"
import type {
	GetParams,
	ImageFile,
	ParamId,
	Response,
	ResponseData,
	ResponseSingleData
} from "src/services/shared"
import { api } from "src/shared/api"
import type { Hotel, HotelChange, HotelReview } from "./hotels.types"

class HotelsService {
	get = async (params: GetParams = {}): Promise<ResponseData<Hotel>> => {
		const response = await api.get(`/partners/hotels `, { params })
		return response.data
	}

	getBySlug = async (slug: ParamId): Promise<ResponseSingleData<Hotel>> => {
		const response = await api.get(`/partners/hotels/${slug}`)
		return response.data
	}

	getImagesBySlug = async (slug: ParamId): Promise<ResponseData<ImageFile>> => {
		const response = await api.get(`/hotels/${slug}/images`)
		return response.data
	}

	getAmenitiesBySlug = async (
		slug: ParamId
	): Promise<ResponseData<Amenity>> => {
		const response = await api.get(`/hotels/${slug}/amenities`)
		return response.data
	}

	getReviewsBySlug = async (
		slug: ParamId,
		params: GetParams = {}
	): Promise<Response<HotelReview>> => {
		const response = await api.get(`/hotels/${slug}/reviews`, { params })
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

	deleteImageBySlug = async (
		slug: ParamId,
		id: ParamId
	): Promise<ResponseSingleData<void>> => {
		const response = await api.delete(`/hotels/${slug}/images/${id}`)
		return response.data
	}

	delete = async (slug: ParamId): Promise<ResponseSingleData<void>> => {
		const response = await api.delete(`/hotels/${slug}`)
		return response.data
	}
}

export const hotelsService = new HotelsService()
