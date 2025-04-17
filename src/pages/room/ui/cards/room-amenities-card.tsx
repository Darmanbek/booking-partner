import { ExclamationCircleOutlined } from "@ant-design/icons"
import { useParams } from "@tanstack/react-router"
import { Card, Col, Descriptions, Row, Space, Typography } from "antd"
import { type FC } from "react"
import { useGetRoomsByIdQuery } from "src/services/rooms"
import { useTranslation } from "src/shared/hooks"
import { FlexEmpty } from "src/widgets/flex-empty"

const { Text } = Typography

const RoomAmenitiesCard: FC = () => {
	const { hotelSlug, roomId } = useParams({
		from: "/_layout/hotels/$hotelSlug/_hotel-layout/rooms/$roomId/"
	})
	const { t } = useTranslation()
	const { data: room, isLoading } = useGetRoomsByIdQuery(hotelSlug, roomId)

	return (
		<>
			<Card title={"Удобства"} loading={isLoading}>
				{room?.data?.amenities?.length ? (
					// <Space>{amenities?.data?.map((el) => t(el.name))}</Space>
					<Row gutter={20} style={{ rowGap: 20 }}>
						{room?.data?.amenities?.map((item, index) => (
							<Col key={index} xs={24} sm={12} md={8}>
								<Descriptions
									column={1}
									title={
										<Space style={{ fontSize: 14 }}>
											<ExclamationCircleOutlined />
											<>{t(item?.name)}</>
										</Space>
									}
									items={item?.room_amenities?.map((childItem) => ({
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

export { RoomAmenitiesCard }
