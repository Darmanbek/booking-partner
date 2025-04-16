import type { FormInstance, FormProps } from "antd"
import { createContext } from "react"
import type { HotelChange } from "src/services/hotels"

export type HotelsRegisterContextValues = {
	form: FormInstance<HotelChange>
	onFinish: FormProps<HotelChange>["onFinish"]
}

export const HotelsRegisterContext =
	createContext<HotelsRegisterContextValues | null>(null)
