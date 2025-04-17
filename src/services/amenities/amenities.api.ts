import type { GetParams, ParamId } from "src/services/shared"
import { useCrudMutation, useCrudQuery } from "src/shared/api"
import { amenitiesService } from "./amenities.service"
import type { HotelAmenityChange } from "./amenities.types"

const useGetAmenitiesQuery = (
	type: "hotel" | "room" = "hotel",
	params: GetParams = {}
) => {
	return useCrudQuery({
		queryFn: () => amenitiesService.get(type, params),
		queryKey: ["amenities", `${type}-amenities`, ...Object.values(params)]
	})
}

const useGetHotelAmenitiesQuery = (
	hotelSlug: ParamId,
	params: GetParams = {}
) => {
	return useCrudQuery({
		queryFn: () => amenitiesService.getByHotel(hotelSlug, params),
		queryKey: ["amenities", hotelSlug, ...Object.values(params)],
		enabled: !!hotelSlug
	})
}

const useCreateAmenitiesMutation = () => {
	return useCrudMutation({
		mutationFn: amenitiesService.create,
		invalidate: {
			queryKey: ["amenities"]
		}
	})
}

const useEditAmenitiesMutation = () => {
	return useCrudMutation({
		mutationFn: amenitiesService.edit,
		invalidate: {
			queryKey: ["amenities"]
		}
	})
}

const useDeleteAmenitiesMutation = () => {
	return useCrudMutation({
		mutationFn: amenitiesService.delete,
		invalidate: {
			queryKey: ["amenities"]
		}
	})
}

const useCreateHotelAmenitiesMutation = (categoryId: ParamId) => {
	return useCrudMutation({
		mutationFn: (variables: HotelAmenityChange) =>
			amenitiesService.createAmenities(categoryId, variables),
		invalidate: {
			queryKey: ["amenities"]
		}
	})
}

const useEditHotelAmenitiesMutation = () => {
	return useCrudMutation({
		mutationFn: amenitiesService.editAmenities,
		invalidate: {
			queryKey: ["amenities"]
		}
	})
}

const useDeleteHotelAmenitiesMutation = () => {
	return useCrudMutation({
		mutationFn: amenitiesService.deleteAmenities,
		invalidate: {
			queryKey: ["amenities"]
		}
	})
}

export {
	useGetAmenitiesQuery,
	useGetHotelAmenitiesQuery,
	useCreateAmenitiesMutation,
	useEditAmenitiesMutation,
	useDeleteAmenitiesMutation,
	useCreateHotelAmenitiesMutation,
	useEditHotelAmenitiesMutation,
	useDeleteHotelAmenitiesMutation
}
