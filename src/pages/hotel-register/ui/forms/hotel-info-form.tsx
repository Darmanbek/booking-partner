import { Form, type FormInstance, type FormProps, Select } from "antd"
import { type FC } from "react"
import { Card, Col, Input, Row } from "src/shared/ui"

interface HotelInfoFormProps {
	form: FormInstance
	onFinish: FormProps["onFinish"]
}

const HotelInfoForm: FC<HotelInfoFormProps> = ({ form, onFinish }) => {
	return (
		<Card title={"Об объекте"}>
			<Form
				name={"hotel-info-form"}
				form={form}
				requiredMark={false}
				autoComplete={"off"}
				layout={"vertical"}
				onFinish={onFinish}
			>
				<Row gutter={16} style={{ rowGap: 16 }}>
					<Col xs={24} md={12}>
						<Form.Item
							label={"Название"}
							name={"name"}
							rules={[{ required: true }]}
						>
							<Input />
						</Form.Item>
						<Row gutter={16} style={{ rowGap: 16 }}>
							<Col xs={24} sm={12}>
								<Form.Item
									label={"Город"}
									name={"city"}
									rules={[{ required: true }]}
								>
									<Select />
								</Form.Item>
							</Col>
							<Col xs={24} sm={12}>
								<Form.Item
									label={"Категория"}
									name={"category"}
									rules={[{ required: true }]}
								>
									<Select />
								</Form.Item>
							</Col>
						</Row>
						<Form.Item
							label={"Адрес"}
							name={"address"}
							rules={[{ required: true }]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col xs={24} md={12}></Col>
				</Row>
			</Form>
		</Card>
	)
}

export { HotelInfoForm }
