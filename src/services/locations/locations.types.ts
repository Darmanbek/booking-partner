import type { TranslateName } from "src/services/shared"

export type LocationCity = {
	id: number
	name: TranslateName
	slug: string
	properties_count: number
	image: string
	country_id: number
	aero_lat: number
	aero_lng: number
	rail_lat: number
	rail_lng: number
	geocode_lng: number
	geocode_lat: number
}
