import { RightOutlined } from "@ant-design/icons"
import { Link, useNavigate } from "@tanstack/react-router"
import { Button, Card, Image, List, Rate, Typography } from "antd"
import Flex from "antd/es/flex"
import { type FC } from "react"
import { type Hotel } from "src/services/hotels"
import { MoreButton } from "src/widgets/more-button"

const { Title, Text } = Typography

interface HotelsListItemProps {
	data: Hotel
}

const HotelsListItem: FC<HotelsListItemProps> = ({ data: hotel }) => {
	const navigate = useNavigate()
	
	return (
		<>
			<Card
				style={{
					marginBottom: 20,
					overflow: "hidden"
				}}
				styles={{
					body: {
						padding: 0
					}
				}}
			>
				<List.Item style={{ gap: 16, padding: 16 }}>
					<Image
						width={120}
						height={120}
						src={hotel.images?.[0]?.image}
						alt={hotel.name.ru}
						style={{ objectFit: "cover", borderRadius: 8 }}
						fallback={"https://placehold.co/120x120"}
					/>
					<Flex flex={1} vertical={true} justify={"space-between"} gap={8}>
						<Flex justify={"space-between"}>
							<Flex vertical={true}>
								<Title level={5}>{hotel.name.ru}</Title>
								<Text type={"secondary"}>
									{hotel.location.city}, {hotel.location.address}
								</Text>
								<div style={{ marginTop: 8 }}>
									{Number(hotel?.rating) >= 0 && (
										<Rate disabled={true} defaultValue={hotel.rating || 0} />
									)}
								</div>
							</Flex>
							<MoreButton onEdit={() => navigate({
								to: "/hotels/$hotelSlug/edit",
								params: {
									hotelSlug: hotel.slug
								}
							})} />
						</Flex>
						<Flex justify={"space-between"} align={"end"}>
							<Text strong={true} style={{ marginTop: 4, display: "block" }}>
								от {Number(hotel?.min_price).toLocaleString()} сум /{" "}
								{hotel.guests} гость
							</Text>
							<Link
								to={"/hotels/$hotelSlug"}
								params={{
									hotelSlug: hotel.slug
								}}
							>
								<Button
									type={"primary"}
									iconPosition={"end"}
									icon={<RightOutlined />}
								>
									Открыть
								</Button>
							</Link>
						</Flex>
					</Flex>
				</List.Item>
			</Card>
		</>
	)
}

export { HotelsListItem }
