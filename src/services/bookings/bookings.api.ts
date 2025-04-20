import type { GetParams, ParamId } from "src/services/shared"
import { useCrudMutation, useCrudQuery } from "src/shared/api"
import { bookingsService } from "./bookings.service"

const useGetBookingsQuery = (hotelSlug: ParamId, params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => bookingsService.get(hotelSlug, params),
		queryKey: ["bookings", hotelSlug, ...Object.values(params)]
	})
}

// const useGetBookingsByIdQuery = (id: unknown) => {
// 	return useCrudQuery({
// 		queryFn: () => bookingsService.getById(id),
// 		queryKey: ["bookings", id],
// 		enabled: !!id,
// 	})
// }

// const useCreateBookingsMutation = () => {
// 	return useCrudMutation({
// 		mutationFn: bookingsService.create,
// 		invalidate: {
// 			queryKey: ["bookings"]
// 		}
// 	})
// }

const useEditBookingsMutation = () => {
	return useCrudMutation({
		mutationFn: bookingsService.edit,
		invalidate: {
			queryKey: ["bookings"]
		}
	})
}

const useEditBookingsStatusMutation = () => {
	return useCrudMutation({
		mutationFn: bookingsService.editStatus,
		invalidate: {
			queryKey: ["bookings"]
		}
	})
}

// const useDeleteBookingsMutation = () => {
// 	return useCrudMutation({
// 		mutationFn: bookingsService.delete,
// 		invalidate: {
// 			queryKey: ["bookings"]
// 		}
// 	})
// }

export {
	useGetBookingsQuery,
	// useGetBookingsByIdQuery,
	// useCreateBookingsMutation,
	useEditBookingsMutation,
	useEditBookingsStatusMutation
	// useDeleteBookingsMutation
}
