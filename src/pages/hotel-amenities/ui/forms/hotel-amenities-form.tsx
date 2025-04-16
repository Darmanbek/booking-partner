import { Checkbox, Collapse, Form, type FormProps, Input } from "antd"
import { type FC, useMemo } from "react"
import { useGetAmenitiesQuery } from "src/services/amenities"
import { useTranslation } from "src/shared/hooks"
import { FormDrawer } from "src/widgets/form-drawer"

const HotelAmenitiesForm: FC = () => {
	const [form] = Form.useForm()
	const { t } = useTranslation()

	const { data: amenities } = useGetAmenitiesQuery("hotel")

	const allAmenities = useMemo(() => {
		let index = 0
		return amenities?.data?.map((item) => ({
			...item,
			hotel_amenities: item?.hotel_amenities?.map((el) => ({
				...el,
				key: index++
			}))
		}))
	}, [amenities?.data])

	const onFinish: FormProps["onFinish"] = (values) => {
		console.log(values)
	}

	return (
		<FormDrawer form={form}>
			<Form
				name={"hotel-amenities-form"}
				form={form}
				layout={"inline"}
				autoComplete={"off"}
				onFinish={onFinish}
			>
				<Form.List name={"amenities"} initialValue={[]}>
					{() => (
						<Collapse
							ghost={true}
							items={allAmenities?.map((el, index) => ({
								key: index,
								label: t(el?.name),
								styles: {
									header: {
										paddingInline: 0
									},
									body: {
										padding: 4
									}
								},
								children: el?.hotel_amenities?.map((childEl, ind) => (
									<Form.Item key={ind} noStyle={true}>
										<Form.Item
											hidden={true}
											name={[childEl.key, "name"]}
											initialValue={childEl?.id}
										>
											<Input hidden={true} />
										</Form.Item>
										<Form.Item
											noStyle={true}
											name={[childEl.key, "value"]}
											valuePropName={"checked"}
											initialValue={false}
										>
											<Checkbox style={{ margin: "0 8px 8px 0" }}>
												{t(childEl?.name)}
											</Checkbox>
										</Form.Item>
									</Form.Item>
								))
							}))}
						/>
					)}
				</Form.List>
			</Form>
		</FormDrawer>
	)
}

export { HotelAmenitiesForm }
