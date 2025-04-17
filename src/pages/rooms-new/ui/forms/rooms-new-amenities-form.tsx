import { Card, Collapse, Form, Space, Typography } from "antd"
import { type FC, useEffect, useMemo } from "react"
import { useRoomsNew } from "src/pages/rooms-new/hooks"
import { useGetAmenitiesQuery } from "src/services/amenities"
import { useTranslation } from "src/shared/hooks"
import { default as RoomsNewAmenitiesFormItem } from "./rooms-new-amenities-form-item"

const { Title } = Typography

const RoomsNewAmenitiesForm: FC = () => {
	const { form, onFinish } = useRoomsNew()
	const { t } = useTranslation()
	const {
		data: amenities = {
			data: []
		},
		isLoading
	} = useGetAmenitiesQuery("room")

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
					<Form.List
						name={"amenities"}
						initialValue={[]}
						rules={[
							{
								validator: async (_, value) => {
									if (!value || value?.filter?.(Boolean)?.length < 2) {
										return Promise.reject(
											new Error("Пожалуйста добавьте услуги")
										)
									}
								}
							}
						]}
					>
						{(_f, _o, { errors }) => (
							<>
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
												{item?.room_amenities?.map((item, childIndex) => {
													return (
														<RoomsNewAmenitiesFormItem
															field={item?.key}
															data={item}
															key={childIndex}
														/>
													)
												})}
											</Space>
										)
									}))}
								/>
								<Form.Item style={{ margin: 0 }}>
									<Form.ErrorList errors={errors} />
								</Form.Item>
							</>
						)}
					</Form.List>
				</Form>
			</Card>
		</>
	)
}

export { RoomsNewAmenitiesForm }
