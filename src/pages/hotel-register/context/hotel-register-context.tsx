import type { FormInstance, FormProps } from "antd"
import { createContext } from "react"
import type { HotelChange } from "src/services/hotels"

export type HotelRegisterContextValues = {
	form: FormInstance<HotelChange>
	onFinish: FormProps<HotelChange>["onFinish"]
}

export const HotelRegisterContext =
	createContext<HotelRegisterContextValues | null>(null)
