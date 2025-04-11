import { Form, type FormProps } from "antd"
import { type FC } from "react"
import {
	HotelAmenitiesForm,
	HotelInfoForGuestForm,
	HotelInfoForm
} from "./forms"

const HotelRegister: FC = () => {
	const [form] = Form.useForm()

	const onFinish: FormProps["onFinish"] = () => {}

	return (
		<>
			<HotelInfoForm form={form} onFinish={onFinish} />
			<HotelAmenitiesForm form={form} onFinish={onFinish} />
			<HotelInfoForGuestForm form={form} onFinish={onFinish} />
		</>
	)
}

export { HotelRegister }
