import { Card, Space } from "antd"
import { type FC } from "react"
import { useGetHotelAmenitiesQuery } from "src/services/amenities"
import { useTranslation } from "src/shared/hooks"

const HotelAmenities: FC = () => {
	const { t } = useTranslation()

	const { data: amenities } = useGetHotelAmenitiesQuery()
	return (
		<>
			<Card title={"Удобства"}>
				<Space>{amenities?.data?.map((el) => t(el.name))}</Space>
			</Card>
		</>
	)
}

export { HotelAmenities }
