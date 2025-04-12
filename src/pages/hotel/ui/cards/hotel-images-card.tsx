import { EditOutlined } from "@ant-design/icons"
import { Button, Card, Col, Image, Row } from "antd"
import { type FC } from "react"

const HotelImagesCard: FC = () => {
	return (
		<>
			<Card
				title={"Фотографии отеля"}
				extra={
					<Button type={"text"} icon={<EditOutlined />}>
						Редактировать
					</Button>
				}
			>
				<Image.PreviewGroup>
					<Row wrap={true} gutter={8} style={{ rowGap: 8 }}>
						{Array.from({ length: 10 }).map((_, index) => (
							<Col key={index}>
								<Image
									src={"/assets/hotel/delta-hotel.jpg"}
									height={100}
									style={{ borderRadius: 8 }}
									width={100}
									alt={"Photo"}
								/>
							</Col>
						))}
					</Row>
				</Image.PreviewGroup>
			</Card>
		</>
	)
}

export { HotelImagesCard }
