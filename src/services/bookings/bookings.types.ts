import type { Partner } from "src/services/partners"
import type { Room } from "src/services/rooms"
import type { TranslateName } from "src/services/shared"

export type Booking = {
	id: number
	status: string
	check_in_date: string
	check_out_date: string
	total_price: number
	total_guests: number
	total_days: number
	special_requests: string
	payment_method_id: number
	payment_method: TranslateName
	booking_type: string
	time: string | null
	user_id: number
	created_at: string
	user: Partner
	booking_rooms: Room[]
}
