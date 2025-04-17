import { Col, DatePicker, Form, type FormProps, Input, Row, Select } from "antd"
import { type FC, useEffect } from "react"
import { useGetCategoriesQuery } from "src/services/categories"
import {
	type Hotel,
	type HotelChange,
	useEditHotelsMutation
} from "src/services/hotels"
import { useTranslation } from "src/shared/hooks"
import { useFormDevtoolsStore } from "src/shared/store"
import { FormDrawer } from "src/widgets/form-drawer"

const HotelInfoForm: FC = () => {
	const [form] = Form.useForm<HotelChange>()
	const { t } = useTranslation()

	const { data: categories, isLoading: categoriesLoading } =
		useGetCategoriesQuery()

	const params = useFormDevtoolsStore((state) => state.getParams<Hotel>())

	const { mutate: editHotel, isPending: editLoading } = useEditHotelsMutation()

	const onFinish: FormProps<HotelChange>["onFinish"] = (values) => {
		if (params) {
			editHotel({
				...values,
				slug: params?.slug
			})
		}
	}

	useEffect(() => {
		if (params) {
			form.setFieldsValue({
				...params,
				name: t(params?.name),
				name_ru: params?.name?.ru,
				name_en: params?.name?.en,
				name_uz: params?.name?.uz,
				name_kk: params?.name?.kk,
				description: t(params.description),
				description_ru: params?.description?.ru,
				description_en: params?.description?.en,
				description_uz: params?.description?.uz,
				description_kk: params?.description?.kk
			})
		}
	}, [form, params, t])
	return (
		<FormDrawer form={form} loading={editLoading}>
			<Form
				form={form}
				onFinish={onFinish}
				name={"hotel-info-form"}
				layout={"vertical"}
				autoComplete={"off"}
			>
				<Form.Item<HotelChange> name={"name"} label={"Название"}>
					<Input />
				</Form.Item>
				<Form.Item<HotelChange> name={"address"} label={"Адрес"}>
					<Input.TextArea />
				</Form.Item>
				<Form.Item<HotelChange>
					name={"hotel_category_id"}
					label={"Тип объекта"}
				>
					<Select
						options={categories?.data?.map((item) => ({
							value: item.id,
							label: t(item.name)
						}))}
						loading={categoriesLoading}
						disabled={categoriesLoading}
						showSearch={true}
						optionFilterProp={"label"}
					/>
				</Form.Item>
				<Row gutter={8}>
					<Col span={12}>
						<Form.Item<HotelChange> name={"check_in"} label={"Заезд"}>
							<DatePicker picker={"time"} />
						</Form.Item>
					</Col>
					<Col span={12}>
						<Form.Item<HotelChange> name={"check_out"} label={"Выезд"}>
							<DatePicker picker={"time"} />
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</FormDrawer>
	)
}

export { HotelInfoForm }
