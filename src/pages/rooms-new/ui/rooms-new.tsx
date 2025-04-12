import { Button, Flex, Form, type FormProps } from "antd"
import { type FC } from "react"
import { type RoomChange } from "src/services/rooms"
import { RoomsNewContext } from "../context"
import {
	RoomsNewAmenitiesForm,
	RoomsNewInfoForm,
	RoomsNewPricesForm
} from "./forms"

const RoomsNew: FC = () => {
	const [form] = Form.useForm<RoomChange>()

	const onFinish: FormProps<RoomChange>["onFinish"] = (values) => {
		console.log(values)
	}

	return (
		<RoomsNewContext.Provider
			value={{
				form,
				onFinish
			}}
		>
			<RoomsNewInfoForm />
			<RoomsNewAmenitiesForm />
			<RoomsNewPricesForm />
			<Flex justify={"center"}>
				<Button type={"primary"} size={"large"} onClick={form.submit}>
					Создать номер
				</Button>
			</Flex>
		</RoomsNewContext.Provider>
	)
}

export { RoomsNew }
