import { Form } from "antd"
import { type FC } from "react"
import { FormDrawer } from "src/widgets/form-drawer"

const HotelImagesForm: FC = () => {
	const [form] = Form.useForm()

	return (
		<FormDrawer form={form} formKey={"primary"}>
			<h1>HotelImagesForm</h1>
		</FormDrawer>
	)
}

export { HotelImagesForm }
