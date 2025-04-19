import { Form, Input } from "antd"
import Button from "antd/es/button"
import { type FC, memo } from "react"
import { useHotelsRegister } from "src/pages/hotels-register/hooks"
import type { HotelAmenity } from "src/services/amenities"
import { useTranslation } from "src/shared/hooks"

interface HotelsAmenitiesFormItemProps {
	data: HotelAmenity
	field: number
}

const HotelsAmenitiesFormItem: FC<HotelsAmenitiesFormItemProps> = ({
	data: item,
	field
}) => {
	const { form } = useHotelsRegister()
	const { t } = useTranslation()
	const formAmenity = Form.useWatch(["amenities", field], form)

	return (
		<>
			<Form.Item>
				<Form.Item name={[field]} hidden={true}>
					<Input hidden={true} />
				</Form.Item>
				<Button
					value={item?.id}
					type={formAmenity ? "primary" : "default"}
					onClick={() => {
						if (formAmenity) {
							form.setFieldValue(["amenities", field], undefined)
							return
						}
						form.setFieldValue(["amenities", field], item?.id)
					}}
				>
					{t(item.name)}
				</Button>
			</Form.Item>
		</>
	)
}

export default memo(HotelsAmenitiesFormItem)
