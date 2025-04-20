export type Chessboard = {
	room_id: number
	room_type: string
	chessboard_items: ChessboardItem[]
}

export type ChessboardActiveBooking = {
	room_id: number
	room_type: string
	active_bookings: ActiveBooking[]
}

export type ChessboardChange = {
	room_id?: number
	check_date: string
	available_rooms_count: number
}

export type ChessboardItem = {
	id: number
	check_date: string
	available_rooms_count: number
}

export type ActiveBooking = {
	booking_id: number
	check_in_date: string
	count: number
}
