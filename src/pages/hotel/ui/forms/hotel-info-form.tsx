import { Form } from "antd"
import { type FC } from "react"
import { FormDrawer } from "src/widgets/form-drawer"

const HotelInfoForm: FC = () => {
	const [form] = Form.useForm()

	return (
		<FormDrawer form={form}>
			<h1>HotelInfoForm</h1>
		</FormDrawer>
	)
}

export { HotelInfoForm }
