import { Card, Collapse, Form, Radio, Space, Typography } from "antd"
import { type FC, useEffect, useMemo } from "react"
import { useRoomsNew } from "src/pages/rooms-new/hooks"
import { useGetAmenitiesQuery } from "src/services/amenities"
import { useTranslation } from "src/shared/hooks"

const { Title } = Typography

const RoomsNewAmenitiesForm: FC = () => {
	const { form, onFinish } = useRoomsNew()
	const { t } = useTranslation()
	const {
		data: amenities = {
			data: []
		},
		isLoading
	} = useGetAmenitiesQuery()

	const roomAmenities = useMemo(() => {
		let index = 0
		return amenities?.data?.map((item) => ({
			...item,
			hotel_amenities: item?.hotel_amenities?.map((el) => ({
				...el,
				key: index++
			}))
		}))
	}, [amenities?.data])

	const formAmenities = Form.useWatch("amenities", form) || [[]]

	useEffect(() => {
		if (amenities) {
			form.setFieldValue(
				"amenities",
				amenities?.data?.flatMap((item) =>
					item?.hotel_amenities?.map(() => undefined)
				)
			)
		}
	}, [amenities, form])
	return (
		<>
			<Card title={"Удобства в номере"} loading={isLoading}>
				<Form
					name={"rooms-new-amenities-form"}
					form={form}
					requiredMark={false}
					autoComplete={"off"}
					layout={"vertical"}
					onFinish={onFinish}
				>
					<Form.List name={"amenities"} initialValue={[[]]}>
						{() => (
							<Collapse
								ghost={true}
								expandIconPosition={"end"}
								defaultActiveKey={[0]}
								items={roomAmenities?.map((item, index) => ({
									key: index,
									label: (
										<Title style={{ fontSize: "inherit" }}>
											{t(item.name)}
										</Title>
									),
									children: (
										<Space wrap={true}>
											{item?.hotel_amenities?.map((item, childIndex) => {
												return (
													<Form.Item key={childIndex} name={[item.key]}>
														<Radio.Button
															key={childIndex}
															value={item?.id}
															checked={
																!!formAmenities?.find((el) => el === item?.id)
															}
															onClick={() => {
																if (
																	formAmenities?.find((el) => el === item?.id)
																) {
																	form.setFieldValue(
																		["amenities", item.key],
																		undefined
																	)
																	return
																}
																form.setFieldValue(
																	["amenities", item.key],
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

export { RoomsNewAmenitiesForm }
