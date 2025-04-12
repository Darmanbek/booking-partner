import type { GetParams, ParamId } from "src/services/shared"
import { useCrudMutation, useCrudQuery } from "src/shared/api"
import { useAuth } from "src/shared/hooks"
import { roomsService } from "./rooms.service"
import type { RoomChange } from "./rooms.types"

const useGetRoomsQuery = (params: GetParams = {}) => {
	const { hotelSlug } = useAuth()
	return useCrudQuery({
		queryFn: () => roomsService.get(hotelSlug, params),
		queryKey: ["rooms", hotelSlug, ...Object.values(params)],
		enabled: !!hotelSlug
	})
}

const useGetRoomsByIdQuery = (id: ParamId) => {
	const { hotelSlug } = useAuth()
	return useCrudQuery({
		queryFn: () => roomsService.getById(hotelSlug, id),
		queryKey: ["rooms", hotelSlug, id],
		enabled: !!id && !!hotelSlug
	})
}

const useCreateRoomsMutation = () => {
	const { hotelSlug } = useAuth()
	return useCrudMutation({
		mutationFn: (form: RoomChange) => roomsService.create(hotelSlug, form),
		invalidate: {
			queryKey: ["rooms", hotelSlug]
		}
	})
}

const useEditRoomsMutation = () => {
	const { hotelSlug } = useAuth()
	return useCrudMutation({
		mutationFn: (form: RoomChange) => roomsService.edit(hotelSlug, form),
		invalidate: {
			queryKey: ["rooms", hotelSlug]
		}
	})
}

const useDeleteRoomsMutation = () => {
	const { hotelSlug } = useAuth()
	return useCrudMutation({
		mutationFn: (id: ParamId) => roomsService.delete(hotelSlug, id),
		invalidate: {
			queryKey: ["rooms", hotelSlug]
		}
	})
}

export {
	useGetRoomsQuery,
	useGetRoomsByIdQuery,
	useCreateRoomsMutation,
	useEditRoomsMutation,
	useDeleteRoomsMutation
}
