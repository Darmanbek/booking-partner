import { RightOutlined } from "@ant-design/icons"
import { useNavigate } from "@tanstack/react-router"
import { Card, Image, List, Rate, Typography } from "antd"
import { type FC } from "react"
import { type Hotel } from "src/services/hotels"

const { Title, Text } = Typography

interface HotelsListItemProps {
	data: Hotel
}

const HotelsListItem: FC<HotelsListItemProps> = ({ data: hotel }) => {
	const navigate = useNavigate()
	const onHotelClick = (hotelSlug: string) => {
		navigate({
			to: "/hotels/$hotelSlug",
			params: {
				hotelSlug
			}
		})
	}
	return (
		<>
			<List.Item
				onClick={() => onHotelClick(hotel?.slug)}
				style={{ cursor: "pointer" }}
			>
				<Card
					hoverable={true}
					style={{ width: "100%" }}
					styles={{
						body: {
							display: "flex",
							gap: 16,
							padding: 16
						}
					}}
				>
					<Image
						width={120}
						height={120}
						src={hotel.images?.[0]?.image}
						alt={hotel.name.ru}
						style={{ objectFit: "cover", borderRadius: 8 }}
						fallback={"https://placehold.co/120x120"}
					/>
					<div style={{ flex: 1 }}>
						<Title level={5}>{hotel.name.ru}</Title>
						<Text type={"secondary"}>
							{hotel.location.city}, {hotel.location.address}
						</Text>
						<div style={{ marginTop: 8 }}>
							{Number(hotel?.rating) >= 0 && (
								<Rate disabled={true} defaultValue={hotel.rating || 0} />
							)}
						</div>
						<Text strong={true} style={{ marginTop: 4, display: "block" }}>
							от {Number(hotel?.min_price).toLocaleString()} сум /{" "}
							{hotel.guests} гость
						</Text>
					</div>

					<RightOutlined
						style={{ fontSize: 16, alignSelf: "center", color: "#999" }}
					/>
				</Card>
			</List.Item>
		</>
	)
}

export { HotelsListItem }
