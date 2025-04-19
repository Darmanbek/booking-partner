import { Card, Collapse, Form, Space, Typography } from "antd"
import { type FC, useEffect, useMemo } from "react"
import { useHotelsRegister } from "src/pages/hotels-register/hooks"
import { useGetAmenitiesQuery } from "src/services/amenities"
import { useTranslation } from "src/shared/hooks"
import { default as HotelsAmenitiesFormItem } from "./hotels-amenities-form-item"

const { Title } = Typography

const HotelsAmenitiesForm: FC = () => {
	const { form, onFinish } = useHotelsRegister()
	const { t } = useTranslation()
	const { data: amenities, isLoading } = useGetAmenitiesQuery()

	const filteredAmenities = useMemo(
		() => amenities?.data.filter((_, index) => index < 1) || [],
		[amenities?.data]
	)

	const hotelAmenities = useMemo(() => {
		let index = 0
		return filteredAmenities?.map((item) => ({
			...item,
			hotel_amenities: item?.hotel_amenities?.map((el) => ({
				...el,
				key: index++
			}))
		}))
	}, [filteredAmenities])

	useEffect(() => {
		if (hotelAmenities) {
			form.setFieldValue(
				"amenities",
				hotelAmenities.flatMap((item) =>
					item?.hotel_amenities?.map(() => undefined)
				)
			)
		}
	}, [hotelAmenities, form])
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
								defaultActiveKey={hotelAmenities.map((_, index) => index)}
								items={hotelAmenities.map((item, index) => ({
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
													<HotelsAmenitiesFormItem
														key={index}
														data={item}
														field={item?.key}
													/>
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
