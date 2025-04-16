import type { Category } from "src/services/categories"

export type * from "./params.types"
export type * from "./response.types"

export type TranslateName = {
	ru: string
	en: string
	uz: string
	kk: string
}

export type TranslateKeys = keyof TranslateName

export type ImageFile = {
	id: number
	image: string
	position: number
	hotel_id: number
}

export type Coordinates = {
	latitude: number
	longitude: number
}

export type ReviewCategoryRating = {
	id: number
	rating: number
	review_category_id: number
	review_id: number
	review_category: Category
}
