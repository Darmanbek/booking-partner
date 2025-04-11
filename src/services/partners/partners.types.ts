export type Partner = {
	id: number
	first_name: string
	last_name: string
	phone_number: string
	has_hotel: boolean
}

export type PartnerChange = {
	phone_number: string
	first_name: string
	last_name: string
}

export type RegisterChange = {
	phone_number: string
	first_name: string
	last_name: string
	password: string
	confirm_password: string
	remember?: boolean
}

export type LoginChange = {
	phone_number: string
	password: string
	remember?: boolean
}

export type VerifyChange = {
	phone_number: string
	code: string
}

export type LogoutChange = {
	refresh_token?: string | null
}
