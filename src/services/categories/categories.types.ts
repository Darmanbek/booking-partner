import type { TranslateName } from "src/services/shared"

export type Category = {
	id: number
	name: TranslateName
	description: TranslateName
}

export type CategoryChange = {
	id?: number
	name: string
	description: string
}
