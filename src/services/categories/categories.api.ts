import { categoriesService } from "src/services/categories/categories.service"
import type { GetParams } from "src/services/shared"
import { useCrudMutation, useCrudQuery } from "src/shared/api"

const useGetCategoriesQuery = (params: GetParams = {}) => {
	return useCrudQuery({
		queryFn: () => categoriesService.get(params),
		queryKey: ["categories", ...Object.values(params)]
	})
}

const useCreateCategoriesMutation = () => {
	return useCrudMutation({
		mutationFn: categoriesService.create,
		invalidate: {
			queryKey: ["categories"]
		}
	})
}

const useEditCategoriesMutation = () => {
	return useCrudMutation({
		mutationFn: categoriesService.edit,
		invalidate: {
			queryKey: ["categories"]
		}
	})
}

const useDeleteCategoriesMutation = () => {
	return useCrudMutation({
		mutationFn: categoriesService.delete,
		invalidate: {
			queryKey: ["categories"]
		}
	})
}

export {
	useGetCategoriesQuery,
	// useGetCategoriesByIdQuery,
	useCreateCategoriesMutation,
	useEditCategoriesMutation,
	useDeleteCategoriesMutation
}
