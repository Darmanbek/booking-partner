import type { GetParams, ResponseSingleData, Tokens } from "src/services/shared"
import { api } from "src/shared/api"
import { tokenStorage } from "src/shared/utils"
import type {
	LoginChange,
	Partner,
	PartnerChange,
	RegisterChange,
	VerifyChange
} from "./partners.types"

class PartnersService {
	getMe = async (
		params: GetParams = {}
	): Promise<ResponseSingleData<Partner>> => {
		const response = await api.get(`/partners/me`, { params })
		return response.data
	}

	register = async (
		form: RegisterChange
	): Promise<ResponseSingleData<Partner>> => {
		const response = await api.post(`/partners/auth/register`, form)
		return response.data
	}

	login = async (form: LoginChange): Promise<ResponseSingleData<Tokens>> => {
		const response = await api.post(`/partners/auth/login`, form)
		return response.data
	}

	verify = async (form: VerifyChange): Promise<ResponseSingleData<Tokens>> => {
		const response = await api.post(`/partners/auth/verify`, form)
		return response.data
	}

	editMe = async (
		form: PartnerChange
	): Promise<ResponseSingleData<Partner>> => {
		const response = await api.put(`/partners/me`, form)
		return response.data
	}

	logout = async (): Promise<ResponseSingleData<void>> => {
		const response = await api.post(`/partners/auth/logout`, {
			refresh_token: tokenStorage.getRefresh()
		})
		return response.data
	}
}

export const partnersService = new PartnersService()
