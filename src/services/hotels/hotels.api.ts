import { hotelsService } from "src/services/hotels/hotels.service"
import type { GetParams } from "src/services/shared"
import { useCrudMutation, useCrudQuery } from "src/shared/api"
import { useAuth } from "src/shared/hooks"

const useGetHotelsQuery = (params: GetParams = {}) => {
	const { hasHotel, hotelSlug } = useAuth()
	return useCrudQuery({
		queryFn: () => hotelsService.get(params),
		queryKey: ["hotels", hotelSlug, ...Object.values(params)],
		enabled: hasHotel
	})
}

const useCreateHotelsMutation = () => {
	return useCrudMutation({
		mutationFn: hotelsService.create,
		invalidate: {
			queryKey: ["hotels"]
		}
	})
}

const useEditHotelsMutation = () => {
	return useCrudMutation({
		mutationFn: hotelsService.edit,
		invalidate: {
			queryKey: ["hotels"]
		}
	})
}

const useDeleteHotelsMutation = () => {
	return useCrudMutation({
		mutationFn: hotelsService.delete,
		invalidate: {
			queryKey: ["hotels"]
		}
	})
}

export {
	useGetHotelsQuery,
	useCreateHotelsMutation,
	useEditHotelsMutation,
	useDeleteHotelsMutation
}
