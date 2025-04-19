import type { Amenity } from "src/services/amenities"
import type { ImageFile } from "src/services/shared"

export type Room = {
	key: number
	id: number
	quantity: number
	base_price: number
	room_area: number
	images: ImageFile[]
	amenities: Amenity[]
	hotel_id: number
	max_guests: number
	room_type_id: number
	room_type: string
	guest_name: string
	guest_quantity: string
	room_price: string
	use_dinamic_price: boolean
}

export type RoomChange = {
	id?: number
	slug?: string
	quantity: number
	base_price: number
	room_area: number
	max_guests: number
	room_type_id: number
	amenities: number[]
	room_prices: {
		guest_quantity: number
		price: number
	}[]
	use_dinamic_price: boolean
}
