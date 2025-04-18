import { Card, Col, Form, Input, InputNumber, Row, Switch } from "antd"
import Flex from "antd/es/flex"
import { type FC, useEffect } from "react"
import { useRoomsNew } from "src/pages/rooms-new/hooks"
import type { RoomChange } from "src/services/rooms"
import { formatInputPrice } from "src/shared/utils"

const RoomsNewPricesForm: FC = () => {
	const { form, onFinish } = useRoomsNew()

	const isDinamicPrice = !!Form.useWatch("use_dinamic_price", form)
	const maxGuests = Form.useWatch("max_guests", form)

	useEffect(() => {
		if (!isDinamicPrice && maxGuests) {
			form.setFieldValue(
				"room_prices",
				Array.from({ length: maxGuests }).map((_, index) => ({
					quest_quantity: index + 1
				}))
			)
		}

		return () => {
			if (!isDinamicPrice && maxGuests < 3) {
				form.setFieldValue("use_dinamic_price", true)
			}
		}
	}, [form, isDinamicPrice, maxGuests])
	return (
		<>
			<Card title={"Стоимость за ночь"}>
				<Form
					name={"rooms-new-prices-form"}
					form={form}
					onFinish={onFinish}
					requiredMark={false}
					layout={"vertical"}
					autoComplete={"off"}
				>
					<Form.Item<RoomChange>
						name={"use_dinamic_price"}
						label={"Одна цена для всех гостей"}
						layout={"horizontal"}
						initialValue={true}
						hidden={maxGuests < 2}
					>
						<Switch />
					</Form.Item>
					{isDinamicPrice ? (
						<Row>
							<Col xs={24} md={12}>
								<Form.Item<RoomChange>
									name={"base_price"}
									label={"Базовая цена для 1 гостя"}
									rules={[{ required: true }]}
								>
									<InputNumber
										style={{ width: "100%" }}
										formatter={formatInputPrice}
									/>
								</Form.Item>
							</Col>
						</Row>
					) : (
						<Form.List name={"room_prices"} initialValue={[{}, {}]}>
							{(fields) => (
								<Form.Item label={"Варианты цен для всех гостей"}>
									<Flex wrap={true} gap={16}>
										{fields.map((field, index) => (
											<Form.Item key={index} noStyle={true}>
												<Form.Item
													name={[field.name, "quest_quantity"]}
													hidden={true}
												>
													<Input hidden={true} />
												</Form.Item>
												<Form.Item
													help={`Гость: ${field.name + 1}`}
													name={[field.name, "price"]}
												>
													<InputNumber
														placeholder={`5000`}
														style={{ width: "100%" }}
														formatter={formatInputPrice}
													/>
												</Form.Item>
											</Form.Item>
										))}
									</Flex>
								</Form.Item>
							)}
						</Form.List>
					)}
				</Form>
			</Card>
		</>
	)
}

export { RoomsNewPricesForm }
