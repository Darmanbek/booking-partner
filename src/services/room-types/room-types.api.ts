import { roomTypesService } from "src/services/room-types/room-types.service"
import type { GetParams } from "src/services/shared"
import { useCrudMutation, useCrudQuery } from "src/shared/api"

const useGetRoomTypesQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => roomTypesService.get(params),
		queryKey: ["room-types", ...Object.values(params)]
	})
}

const useCreateRoomTypesMutation = () => {
	return useCrudMutation({
		mutationFn: roomTypesService.create,
		invalidate: {
			queryKey: ["room-types"]
		}
	})
}

const useEditRoomTypesMutation = () => {
	return useCrudMutation({
		mutationFn: roomTypesService.edit,
		invalidate: {
			queryKey: ["room-types"]
		}
	})
}

const useDeleteRoomTypesMutation = () => {
	return useCrudMutation({
		mutationFn: roomTypesService.delete,
		invalidate: {
			queryKey: ["room-types"]
		}
	})
}

export {
	useGetRoomTypesQuery,
	useCreateRoomTypesMutation,
	useEditRoomTypesMutation,
	useDeleteRoomTypesMutation
}
