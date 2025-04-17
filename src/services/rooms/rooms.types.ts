export type Room = {
	key: number
	id: number
	quantity: number
	base_price: number
	room_area: number
	image: string
	hotel_id: number
	max_guests: number
	room_type_id: number
	room_type: string
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
}
