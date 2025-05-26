import type { TranslateName } from "src/services/shared"

export type RoomType = {
	id: number
	name: TranslateName
}

export type RoomTypeChange = {
	id?: number
	name: string
}
