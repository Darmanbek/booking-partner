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
	image: string
	position: number
	hotel_id: number
}
