import type { FormInstance, FormProps } from "antd"
import { createContext } from "react"
import type { RoomChange } from "src/services/rooms"

export type RoomsNewContextValues = {
	form: FormInstance<RoomChange>
	onFinish: FormProps<RoomChange>["onFinish"]
}

export const RoomsNewContext = createContext<RoomsNewContextValues | null>(null)
