import { Card, Collapse, Form, Radio, Space, Typography } from "antd"
import { type FC, useEffect, useMemo } from "react"
import { useHotelsRegister } from "src/pages/hotels-register/hooks"
import { useGetAmenitiesQuery } from "src/services/amenities"
import { useTranslation } from "src/shared/hooks"

const { Title } = Typography

const HotelsAmenitiesForm: FC = () => {
	const { form, onFinish } = useHotelsRegister()
	const { t } = useTranslation()
	const { data: amenities, isLoading } = useGetAmenitiesQuery()

	const filteredAmenities = useMemo(
		() => amenities?.data.filter((_, index) => index < 1) || [],
		[amenities?.data]
	)

	const formAmenities =
		(Form.useWatch("amenities", form) as (number | undefined)[]) || []

	useEffect(() => {
		if (filteredAmenities) {
			form.setFieldValue(
				"amenities",
				filteredAmenities.flatMap((item) =>
					item?.hotel_amenities?.map(() => undefined)
				)
			)
		}
	}, [filteredAmenities, form])
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
					<Form.List name={"amenities"} initialValue={[]}>
						{() => (
							<Collapse
								ghost={true}
								expandIconPosition={"end"}
								defaultActiveKey={filteredAmenities.map((_, index) => index)}
								items={filteredAmenities.map((item, index) => ({
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
													<Form.Item key={index} name={[index]}>
														<Radio.Button
															key={index}
															value={item?.id}
															checked={
																!!formAmenities?.find((el) => el === item?.id)
															}
															onClick={() => {
																if (
																	formAmenities?.find((el) => el === item?.id)
																) {
																	form.setFieldValue(
																		["amenities", index],
																		undefined
																	)
																	return
																}
																form.setFieldValue(
																	["amenities", index],
																	item?.id
																)
															}}
														>
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

export { HotelsAmenitiesForm }
