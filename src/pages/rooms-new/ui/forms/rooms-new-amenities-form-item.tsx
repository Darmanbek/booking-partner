import { Form, Input } from "antd"
import Button from "antd/es/button"
import { type FC, memo } from "react"
import { useRoomsNew } from "src/pages/rooms-new/hooks"
import { type HotelAmenity } from "src/services/amenities"
import { useTranslation } from "src/shared/hooks"

interface RoomsNewAmenitiesFormItemProps {
	field: number
	data: HotelAmenity
}

const RoomsNewAmenitiesFormItem: FC<RoomsNewAmenitiesFormItemProps> = ({
	field,
	data: amenity
}) => {
	const { form } = useRoomsNew()
	const { t } = useTranslation()
	const formAmenity = Form.useWatch(["amenities", field], form)

	return (
		<>
			<Form.Item noStyle={true}>
				<Form.Item name={[field]} hidden={true}>
					<Input hidden={true} />
				</Form.Item>
				<Form.Item noStyle={true}>
					<Button
						type={formAmenity ? "primary" : "default"}
						onClick={() => {
							if (formAmenity) {
								form.setFieldValue(["amenities", field], undefined)
								return
							}
							form.setFieldValue(["amenities", field], amenity?.id)
						}}
					>
						{t(amenity.name)}
					</Button>
				</Form.Item>
			</Form.Item>
		</>
	)
}

export default memo(RoomsNewAmenitiesFormItem)
