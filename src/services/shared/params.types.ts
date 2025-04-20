export type GetParams = {
	page?: number
	page_size?: number
	search?: string
	has_hotel?: boolean
	start_date?: string
	end_date?: string
}

export type ParamId = number | string | null | undefined
