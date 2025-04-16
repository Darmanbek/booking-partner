import { ExclamationCircleOutlined } from "@ant-design/icons"
import { useParams } from "@tanstack/react-router"
import { Card, Col, Descriptions, Row, Space, Typography } from "antd"
import { type FC } from "react"
import { useGetHotelsAmenitiesBySlugQuery } from "src/services/hotels"
import { useTranslation } from "src/shared/hooks"
import { EditButton } from "src/widgets/edit-button"
import { FlexEmpty } from "src/widgets/flex-empty"
import { HotelAmenitiesForm } from "./forms"

const { Text } = Typography

const HotelAmenities: FC = () => {
	const { t } = useTranslation()
	const { hotelSlug } = useParams({
		from: "/_layout/hotels/$hotelSlug/_hotel-layout/(hotel-info)/_hotel-info-layout/amenities"
	})

	const { data: amenities, isLoading } =
		useGetHotelsAmenitiesBySlugQuery(hotelSlug)
	return (
		<>
			<HotelAmenitiesForm />
			<Card
				title={"Удобства"}
				extra={<EditButton params={{}} />}
				loading={isLoading}
			>
				{amenities?.data?.length ? (
					// <Space>{amenities?.data?.map((el) => t(el.name))}</Space>
					<Row gutter={20} style={{ rowGap: 20 }}>
						{amenities?.data?.map((item, index) => (
							<Col key={index} xs={24} sm={12} md={8}>
								<Descriptions
									column={1}
									title={
										<Space style={{ fontSize: 14 }}>
											<ExclamationCircleOutlined />
											<>{t(item?.name)}</>
										</Space>
									}
									items={item?.hotel_amenities?.map((childItem) => ({
										key: childItem?.id,
										children: (
											<Space align={"center"}>
												<Text type={"secondary"}>•</Text>
												{t(childItem?.name)}
											</Space>
										)
									}))}
								/>
							</Col>
						))}
					</Row>
				) : (
					<FlexEmpty />
				)}
			</Card>
		</>
	)
}

export { HotelAmenities }
