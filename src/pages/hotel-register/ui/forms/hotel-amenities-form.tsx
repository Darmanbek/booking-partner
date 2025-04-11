import {
	Collapse,
	Form,
	type FormInstance,
	type FormProps,
	Radio,
	Space
} from "antd"
import { type FC } from "react"
import { useGetAmenitiesQuery } from "src/services/amenities"
import { useTranslation } from "src/shared/hooks"
import { Card, Title } from "src/shared/ui"

interface HotelAmenitiesFormProps {
	form: FormInstance
	onFinish: FormProps["onFinish"]
}

const HotelAmenitiesForm: FC<HotelAmenitiesFormProps> = ({
	form,
	onFinish
}) => {
	const { t } = useTranslation()
	const { data: amenities, isLoading } = useGetAmenitiesQuery()

	return (
		<>
			<Card title={"Удобства"} loading={isLoading}>
				<Form
					name={"hotel-amenities-form"}
					form={form}
					requiredMark={false}
					autoComplete={"off"}
					layout={"vertical"}
					onFinish={onFinish}
				>
					<Form.List name={"amenities"}>
						{() => (
							<Collapse
								ghost={true}
								expandIconPosition={"end"}
								defaultActiveKey={amenities?.data.map((_, index) => index)}
								items={amenities?.data
									.filter((_, index) => index < 1)
									.map((item, index) => ({
										key: index,
										label: (
											<Title style={{ fontSize: "inherit" }}>
												{t(item.name)}
											</Title>
										),
										children: (
											<Space wrap={true}>
												{item?.hotel_amenities?.map((item, index) => {
													return (
														<Form.Item
															key={index}
															name={[index]}
															dependencies={[index]}
														>
															<Radio.Button key={index} value={item?.id}>
																{t(item.name)}
															</Radio.Button>
														</Form.Item>
													)
												})}
											</Space>
										)
									}))}
							/>
						)}
					</Form.List>
				</Form>
			</Card>
		</>
	)
}

export { HotelAmenitiesForm }
