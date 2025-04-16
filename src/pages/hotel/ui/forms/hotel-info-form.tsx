import { Col, DatePicker, Form, Input, Row } from "antd"
import { type FC } from "react"
import { FormDrawer } from "src/widgets/form-drawer"

const HotelInfoForm: FC = () => {
	const [form] = Form.useForm()

	return (
		<FormDrawer form={form}>
			<Form name={"hotel-info-form"} layout={"vertical"} autoComplete={"off"}>
				<Form.Item label={"Название"}>
					<Input />
				</Form.Item>
				<Form.Item label={"Адрес"}>
					<Input.TextArea />
				</Form.Item>
				<Form.Item label={"Тип объекта"}>
					<Input />
				</Form.Item>
				<Row gutter={8}>
					<Col span={12}>
						<Form.Item label={"Заезд"}>
							<DatePicker picker={"time"} />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item label={"Выезд"}>
							<DatePicker picker={"time"} />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</FormDrawer>
	)
}

export { HotelInfoForm }
