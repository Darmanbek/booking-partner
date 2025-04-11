import {
	DatePicker,
	Form,
	type FormInstance,
	type FormProps,
	Input
} from "antd"
import { type FC } from "react"
import { Card, Col, Row } from "src/shared/ui"

interface HotelInfoForGuestFormProps {
	form: FormInstance
	onFinish: FormProps["onFinish"]
}

const HotelInfoForGuestForm: FC<HotelInfoForGuestFormProps> = ({
	form,
	onFinish
}) => {
	return (
		<>
			<Card title={"Информация для гостя"}>
				<Form
					name={"hotel-info-for-guest-form"}
					form={form}
					requiredMark={false}
					autoComplete={"off"}
					layout={"vertical"}
					onFinish={onFinish}
				>
					<Row gutter={16} style={{ rowGap: 16 }}>
						<Col xs={24} md={12}>
							<Form.Item
								label={"Телефон номер"}
								name={"phone_number"}
								rules={[{ required: true }]}
							>
								<Input addonBefore={"+998"} />
							</Form.Item>
						</Col>
						<Col xs={24} md={12}>
							<Form.Item
								label={"Email почта"}
								name={"email"}
								rules={[{ required: true }, { type: "email" }]}
							>
								<Input />
							</Form.Item>
						</Col>
					</Row>
					<Form.Item
						label={"Сайт объекта"}
						name={"site_url"}
						rules={[{ required: true }, { type: "url" }]}
					>
						<Input />
					</Form.Item>
					<Row gutter={16} style={{ rowGap: 16 }}>
						<Col xs={24} md={12}>
							<Form.Item
								label={"Время заезда"}
								name={"check_in"}
								rules={[{ required: true }]}
							>
								<DatePicker picker={"time"} format={"HH:mm"} />
							</Form.Item>
						</Col>
						<Col xs={24} md={12}>
							<Form.Item
								label={"Время выезда"}
								name={"check_out"}
								rules={[{ required: true }]}
							>
								<DatePicker picker={"time"} format={"HH:mm"} />
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Card>
		</>
	)
}

export { HotelInfoForGuestForm }
