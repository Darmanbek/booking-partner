import type {
	GetParams,
	ParamId,
	ResponseData,
	ResponseSingleData
} from "src/services/shared"
import { api } from "src/shared/api"
import type { RoomType, RoomTypeChange } from "./room-types.types"

class RoomTypesService {
	get = async (params: GetParams = {}): Promise<ResponseData<RoomType>> => {
		const response = await api.get(`/room-types`, { params })
		return response.data
	}

	create = async (
		form: RoomTypeChange
	): Promise<ResponseSingleData<RoomType>> => {
		const response = await api.post(`/room-types`, form)
		return response.data
	}

	edit = async (
		form: RoomTypeChange
	): Promise<ResponseSingleData<RoomType>> => {
		const response = await api.put(`/room-types/${form.id}`, form)
		return response.data
	}

	delete = async (id: ParamId): Promise<ResponseSingleData<void>> => {
		const response = await api.delete(`/room-types/${id}`)
		return response.data
	}
}

export const roomTypesService = new RoomTypesService()
