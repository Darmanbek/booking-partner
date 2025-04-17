import type {
	GetParams,
	ImageFile,
	ParamId,
	ResponseData,
	ResponseSingleData
} from "src/services/shared"
import { api } from "src/shared/api"
import type { Room, RoomChange } from "./rooms.types"

class RoomsService {
	get = async (
		hotelSlug: ParamId,
		params: GetParams = {}
	): Promise<ResponseData<Room>> => {
		const response = await api.get(`/hotels/${hotelSlug}/rooms`, { params })
		return response.data
	}

	getById = async (
		hotelSlug: ParamId,
		id: ParamId
	): Promise<ResponseSingleData<Room>> => {
		const response = await api.get(`/hotels/${hotelSlug}/rooms/${id}`)
		return response.data
	}

	getImagesById = async (
		hotelSlug: ParamId,
		id: ParamId
	): Promise<ResponseData<ImageFile>> => {
		const response = await api.get(`/hotels/${hotelSlug}/rooms/${id}/images`)
		return response.data
	}

	create = async (
		hotelSlug: ParamId,
		form: RoomChange
	): Promise<ResponseSingleData<void>> => {
		const response = await api.post(`/hotels/${hotelSlug}/rooms`, form)
		return response.data
	}

	edit = async (
		hotelSlug: ParamId,
		form: RoomChange
	): Promise<ResponseSingleData<void>> => {
		const response = await api.put(
			`/hotels/${hotelSlug}/rooms/${form.id}`,
			form
		)
		return response.data
	}

	deleteImageBySlug = async (
		hotelSlug: ParamId,
		id: ParamId
	): Promise<ResponseSingleData<void>> => {
		const response = await api.delete(`/hotels/${hotelSlug}/rooms/images/${id}`)
		return response.data
	}

	delete = async (
		hotelSlug: ParamId,
		id: ParamId
	): Promise<ResponseSingleData<void>> => {
		const response = await api.delete(`/hotels/${hotelSlug}/rooms/${id}`)
		return response.data
	}
}

export const roomsService = new RoomsService()
