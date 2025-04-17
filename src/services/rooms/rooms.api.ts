import { useQueryClient } from "@tanstack/react-query"
import type { GetParams, ParamId } from "src/services/shared"
import { useCrudMutation, useCrudQuery } from "src/shared/api"
import { roomsService } from "./rooms.service"
import type { RoomChange } from "./rooms.types"

const useGetRoomsQuery = (hotelSlug: ParamId, params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => roomsService.get(hotelSlug, params),
		queryKey: ["rooms", hotelSlug, ...Object.values(params)],
		enabled: !!hotelSlug
	})
}

const useGetRoomsByIdQuery = (hotelSlug: ParamId, id: ParamId) => {
	return useCrudQuery({
		queryFn: () => roomsService.getById(hotelSlug, id),
		queryKey: ["rooms", hotelSlug, id],
		enabled: !!id && !!hotelSlug
	})
}

const useGetRoomsImagesByIdQuery = (hotelSlug: ParamId, id: ParamId) => {
	return useCrudQuery({
		queryFn: () => roomsService.getImagesById(hotelSlug, id),
		queryKey: ["rooms", hotelSlug, id, "images"],
		enabled: !!id && !!hotelSlug
	})
}

const useCreateRoomsMutation = (hotelSlug: ParamId) => {
	return useCrudMutation({
		mutationFn: (form: RoomChange) => roomsService.create(hotelSlug, form),
		renderSuccess: () => ({
			description: "Комната успешно создана"
		}),
		invalidate: {
			queryKey: ["rooms", hotelSlug]
		}
	})
}

const useEditRoomsMutation = (hotelSlug: ParamId) => {
	const queryClient = useQueryClient()
	return useCrudMutation({
		mutationFn: (form: RoomChange) => roomsService.edit(hotelSlug, form),
		invalidate: {
			queryKey: ["rooms", hotelSlug]
		},
		onSuccess: async () => {
			await queryClient.refetchQueries({
				queryKey: ["rooms", hotelSlug]
			})
		}
	})
}

const useDeleteRoomsImageByIdMutation = (hotelSlug: ParamId) => {
	return useCrudMutation({
		mutationFn: (id: ParamId) => roomsService.deleteImageBySlug(hotelSlug, id),
		renderSuccess: () => ({
			description: "Фото успешно удалена"
		}),
		invalidate: {
			queryKey: ["rooms", hotelSlug]
		}
	})
}

const useDeleteRoomsMutation = (hotelSlug: ParamId) => {
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
	useGetRoomsImagesByIdQuery,
	useCreateRoomsMutation,
	useEditRoomsMutation,
	useDeleteRoomsImageByIdMutation,
	useDeleteRoomsMutation
}
