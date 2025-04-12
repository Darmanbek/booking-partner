import type { ImageFile, TranslateName } from "src/services/shared"

export type Hotel = {
	id: number
	slug: string
	name: TranslateName
	description: TranslateName
	hotel_admin_id: number
	is_active: boolean
	images: ImageFile[]
	hotel_category_id: number
	hotel_rating: number | null
	rule: HotelRule
	hotel_info: HotelInfo
	hotel_category: HotelCategory
	created_at: string
	updated_at: string | null
}

export type HotelRule = {
	id: number
	check_in_until: string | null
	check_in_from: string
	check_out_until: string | null
	check_out_from: string
	hotel_id: number
}

export type HotelInfo = {
	id: number
	first_phone_number: string
	second_phone_number: string
	site_url: string
	email: string
	hotel_id: number
}

export type HotelCategory = {
	id: number
	name: TranslateName
	description: TranslateName
}

export type HotelChange = {
	slug?: string
	description: string
	description_ru: string
	description_en: string
	description_uz: string
	description_kk: string
	name: string
	name_ru: string
	name_en: string
	name_uz: string
	name_kk: string
	hotel_category_id: number
	address: string
	city_id: number
	latitude: number
	longitude: number
	amenities: number[]
	check_in: string
	check_out: string
	star_rating: number
	email_for_guests: string
	first_phone_for_guests: string
	second_phone_for_guests: string
	site_url: string
}

export type HotelInformationForBooking = {}

export type HotelInformationForGuests = {}
