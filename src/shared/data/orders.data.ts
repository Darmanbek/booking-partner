import type { Partner } from "src/services/partners"

export type Order = {
	id: number
	user: Partner
	guest_count: number
	room_type: string
	price: number
	payment_type: string
	dates: {
		check_in: string
		check_out: string
		night_count: number
	}
	created_at: string
}

export const ordersData: Order[] = Array.from({ length: 5 }).map(() => ({
	id: Math.round(10000000 + Math.random() * 80000000),
	user: {
		id: 1,
		first_name: "Алекс",
		last_name: "Мерсер",
		phone_number: "998901234567",
		has_hotel: false
	},
	guest_count: Math.round(1 + Math.random() * 5),
	payment_type: "Оплата в отеле",
	price: Math.round(1000000 + Math.random() * 8000000),
	room_type: "Апартементы",
	dates: {
		check_in: "2025-03-02",
		check_out: "2025-03-04",
		night_count: 2
	},
	created_at: "2025-03-01"
}))
