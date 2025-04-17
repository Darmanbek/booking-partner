import { RightOutlined, UserOutlined } from "@ant-design/icons"
import { Card, List, Tag } from "antd"
import Image from "antd/es/image"
import Typography from "antd/es/typography"
import { type FC } from "react"
import type { Room } from "src/services/rooms"
import { formatPrice } from "src/shared/utils"

const { Text, Title } = Typography

interface RoomsListSecondItemProps {
	data: Room
}

const RoomsListSecondItem: FC<RoomsListSecondItemProps> = ({ data: room }) => {
	const onRoomClick = (id: number) => {
		console.log(id)
	}

	return (
		<>
			<List.Item
				onClick={() => onRoomClick(room.id)}
				style={{ cursor: "pointer" }}
			>
				<Card
					hoverable={true}
					style={{ width: "100%" }}
					styles={{
						body: { display: "flex", gap: 16, padding: "16px 16px 16px 0" }
					}}
				>
					<Image
						width={120}
						height={120}
						src={room.images?.[0]?.image}
						alt={room.room_type}
						style={{ objectFit: "cover", borderRadius: 8 }}
						fallback={"https://placehold.co/120x120"}
					/>

					<div style={{ flex: 1 }}>
						<Title level={5} style={{ margin: 0 }}>
							{room.room_type}
						</Title>
						<div style={{ marginTop: 4 }}>
							<Tag icon={<UserOutlined />} color={"blue"}>
								до {room.max_guests} гостей
							</Tag>
							<Tag color={"green"}>{room.room_area} м²</Tag>
						</div>
						<Text strong={true} style={{ display: "block", marginTop: 8 }}>
							от {formatPrice(room.base_price)} сум / ночь
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

export { RoomsListSecondItem }
