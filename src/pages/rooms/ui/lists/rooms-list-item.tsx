import { MoreOutlined, RetweetOutlined, TeamOutlined } from "@ant-design/icons"
import { Button, Card, Flex, Image, List, Space } from "antd"
import { type FC } from "react"
import type { Room } from "src/services/rooms"
import { useToken, useTranslation } from "src/shared/hooks"
import { Text, Title } from "src/shared/ui"
import { formatPriceWithCurrency } from "src/shared/utils/format.utils"

interface HotelListItemProps {
	data?: Room
}

const RoomsListItem: FC<HotelListItemProps> = ({ data: room }) => {
	const { t } = useTranslation()

	const { token } = useToken()
	return (
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
			<List.Item style={{ padding: 0, alignItems: "stretch" }}>
				<Flex style={{ position: "relative", padding: 12 }}>
					<Image
						width={256}
						style={{
							aspectRatio: 1,
							borderRadius: token.borderRadiusLG,
							display: "flex",
							justifyContent: "center",
							alignItems: "center"
						}}
						alt={t(room?.room_type)}
						src={room?.image}
					/>
				</Flex>
				<Flex
					vertical={true}
					justify={"space-between"}
					gap={20}
					style={{ padding: 20, paddingLeft: 8, flexGrow: 1 }}
				>
					<Flex justify={"space-between"}>
						<Flex vertical={true} align={"start"}>
							<Title level={4}>{t(room?.room_type)}</Title>
							<Space split={<Text>•</Text>}>
								<Space>
									<RetweetOutlined />
									{`${Number(room?.room_area)?.toFixed(1)} м2`}
								</Space>
								<Space>
									<TeamOutlined />
									{`Количество гостей: ${room?.max_guests || 0}`}
								</Space>
							</Space>
						</Flex>
						<Button
							iconPosition={"end"}
							type={"text"}
							icon={<MoreOutlined style={{ fontSize: 24 }} />}
							key={"link"}
						/>
					</Flex>
					<Flex justify={"space-between"} align={"end"}>
						<Flex vertical={true}>
							<Title level={3} style={{ margin: 0 }}>
								{formatPriceWithCurrency(room?.base_price)}
							</Title>
							<Text type={"secondary"}>за ночь для 1 гостя</Text>
						</Flex>
					</Flex>
				</Flex>
			</List.Item>
		</Card>
	)
}

export { RoomsListItem }
