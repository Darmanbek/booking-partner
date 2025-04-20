import { useQueryClient } from "@tanstack/react-query"
import { hotelsService } from "src/services/hotels/hotels.service"
import type { GetParams, ParamId } from "src/services/shared"
import { useCrudMutation, useCrudQuery } from "src/shared/api"

const useGetHotelsQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => hotelsService.get(params),
		queryKey: ["hotels", ...Object.values(params)]
	})
}

const useGetHotelsBySlugQuery = (slug: ParamId) => {
	return useCrudQuery({
		queryFn: () => hotelsService.getBySlug(slug),
		queryKey: ["hotels", slug],
		enabled: !!slug
	})
}

const useGetHotelsImagesBySlugQuery = (slug: ParamId) => {
	return useCrudQuery({
		queryFn: () => hotelsService.getImagesBySlug(slug),
		queryKey: ["hotels", slug, "images"],
		enabled: !!slug
	})
}

const useGetHotelsAmenitiesBySlugQuery = (slug: ParamId) => {
	return useCrudQuery({
		queryFn: () => hotelsService.getAmenitiesBySlug(slug),
		queryKey: ["hotels", slug, "amenities"],
		enabled: !!slug
	})
}

const useGetHotelsReviewsBySlugQuery = (
	slug: ParamId,
	params: GetParams = {}
) => {
	return useCrudQuery({
		queryFn: () => hotelsService.getReviewsBySlug(slug, params),
		queryKey: ["hotels", slug, "reviews", ...Object.values(params)],
		enabled: !!slug
	})
}

const useCreateHotelsMutation = () => {
	return useCrudMutation({
		mutationFn: hotelsService.create,
		renderSuccess: () => ({
			description: "Отель успешно создан"
		}),
		invalidate: {
			queryKey: ["hotels"]
		}
	})
}

const useEditHotelsMutation = () => {
	const queryClient = useQueryClient()
	return useCrudMutation({
		mutationFn: hotelsService.edit,
		renderSuccess: () => ({
			description: "Отель успешно изменен"
		}),
		onSuccess: () => {
			queryClient.removeQueries({
				queryKey: ["hotels"]
			})
		},
		invalidate: {
			queryKey: ["hotels"]
		}
	})
}

const useDeleteHotelsImageBySlugMutation = (slug: ParamId) => {
	return useCrudMutation({
		mutationFn: (id: ParamId) => hotelsService.deleteImageBySlug(slug, id),
		renderSuccess: () => ({
			description: "Фото успешно удалена"
		}),
		invalidate: {
			queryKey: ["hotels", slug]
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
	useGetHotelsBySlugQuery,
	useGetHotelsImagesBySlugQuery,
	useGetHotelsAmenitiesBySlugQuery,
	useGetHotelsReviewsBySlugQuery,
	useCreateHotelsMutation,
	useEditHotelsMutation,
	useDeleteHotelsImageBySlugMutation,
	useDeleteHotelsMutation
}
