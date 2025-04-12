import {
	useQueryClient,
	useQueryErrorResetBoundary
} from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import type { GetParams } from "src/services/shared"
import { useCrudMutation, useCrudQuery } from "src/shared/api"
import { useAuth } from "src/shared/hooks"
import { partnersService } from "./partners.service"

const useGetMeQuery = (params: GetParams = {}) => {
	const auth = useAuth()
	const queryClient = useQueryClient()
	const queryErrorResetBoundary = useQueryErrorResetBoundary()
	const navigate = useNavigate()
	return useCrudQuery({
		queryFn: () => partnersService.getMe(params),
		queryKey: ["partners", ...Object.values(params)],
		onError: () => {
			auth.logout()
			queryClient.removeQueries({
				queryKey: ["partners"]
			})
			navigate({
				to: "/auth/login",
				replace: true,
				ignoreBlocker: true
			})
			queryErrorResetBoundary.reset()
		}
	})
}

const useLoginMutation = () => {
	return useCrudMutation({
		mutationFn: partnersService.login,
		invalidate: {
			queryKey: ["partners"]
		}
	})
}

const useRegisterMutation = () => {
	return useCrudMutation({
		mutationFn: partnersService.register,
		invalidate: {
			queryKey: ["partners"]
		}
	})
}

const useVerifyMutation = () => {
	return useCrudMutation({
		mutationFn: partnersService.verify,
		invalidate: {
			queryKey: ["partners"]
		}
	})
}

const useLogoutMutation = () => {
	const queryClient = useQueryClient()
	return useCrudMutation({
		mutationFn: partnersService.logout,
		onSuccess: () => {
			queryClient.removeQueries({
				queryKey: ["users"]
			})
		}
	})
}

const useEditUsersMutation = () => {
	return useCrudMutation({
		mutationFn: partnersService.editMe,
		invalidate: {
			queryKey: ["users"]
		}
	})
}

// const useEditPhoneUsersMutation = () => {
// 	return useCrudMutation({
// 		mutationFn: partnersService.editMePhone,
// 		invalidate: {
// 			queryKey: ["users"]
// 		}
// 	})
// }

// const useVerifyPhoneUsersMutation = () => {
// 	return useCrudMutation({
// 		mutationFn: partnersService.verifyMePhone,
// 		invalidate: {
// 			queryKey: ["users"]
// 		}
// 	})
// }

// const useDeleteUsersMutation = () => {
// 	const queryClient = useQueryClient()
// 	return useCrudMutation({
// 		mutationFn: partnersService.deleteMe,
// 		onSuccess: () => {
// 			queryClient.removeQueries({
// 				queryKey: ["users"]
// 			})
// 		}
// 	})
// }

export {
	useGetMeQuery,
	useLoginMutation,
	useRegisterMutation,
	useVerifyMutation,
	useLogoutMutation,
	useEditUsersMutation
	// useEditPhoneUsersMutation,
	// useVerifyPhoneUsersMutation,
	// useDeleteUsersMutation
}
