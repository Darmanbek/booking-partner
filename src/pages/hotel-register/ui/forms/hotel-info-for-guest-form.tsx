import { DatePicker, Form, Input } from "antd"
import { type FC } from "react"
import { useHotelRegister } from "src/pages/hotel-register/hooks"
import type { HotelChange } from "src/services/hotels"
import { Card, Col, Row } from "src/shared/ui"

const HotelInfoForGuestForm: FC = () => {
	const { form, onFinish } = useHotelRegister()

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
							<Form.Item<HotelChange>
								label={"Телефон номер"}
								name={"first_phone_for_guests"}
								rules={[{ required: true }]}
							>
								<Input addonBefore={"+998"} />
							</Form.Item>
						</Col>
						<Col xs={24} md={12}>
							<Form.Item<HotelChange>
								label={"Дополнительный телефон номер"}
								help={"(Необязательно)"}
								name={"second_phone_for_guests"}
								rules={[{ required: false }]}
							>
								<Input addonBefore={"+998"} />
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16} style={{ rowGap: 16 }}>
						<Col xs={24} md={12}>
							<Form.Item<HotelChange>
								label={"Email почта"}
								name={"email_for_guests"}
								rules={[{ required: true }, { type: "email" }]}
							>
								<Input />
							</Form.Item>
						</Col>
						<Col xs={24} md={12}>
							<Form.Item<HotelChange>
								label={"Сайт объекта"}
								name={"site_url"}
								rules={[{ required: true }, { type: "url" }]}
							>
								<Input />
							</Form.Item>
						</Col>
					</Row>

					<Row gutter={16} style={{ rowGap: 16 }}>
						<Col xs={24} md={12}>
							<Form.Item<HotelChange>
								label={"Время заезда"}
								name={"check_in"}
								rules={[{ required: true }]}
							>
								<DatePicker picker={"time"} format={"HH:mm"} />
							</Form.Item>
						</Col>
						<Col xs={24} md={12}>
							<Form.Item<HotelChange>
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
