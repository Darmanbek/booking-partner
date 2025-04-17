import { InboxOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons"
import { useParams } from "@tanstack/react-router"
import {
	Col,
	Flex,
	Input,
	List,
	Row,
	Select,
	Space,
	Table,
	Typography
} from "antd"
import Avatar from "antd/es/avatar"
import { type FC } from "react"
import { type Booking, useGetBookingsQuery } from "src/services/bookings"
import { type Room } from "src/services/rooms"
import { formatPriceWithCurrency } from "src/shared/utils"
import { useOrdersTableColumns } from "./orders-table-columns"

const { Title, Text } = Typography

const OrdersTable: FC = () => {
	const { hotelSlug } = useParams({
		from: "/_layout/hotels/$hotelSlug/_hotel-layout/orders"
	})

	const { data: orders, isLoading, isFetching } = useGetBookingsQuery(hotelSlug)

	const columns = useOrdersTableColumns()
	return (
		<>
			<Table<Booking>
				rowKey={"id"}
				loading={isLoading || isFetching}
				title={() => (
					<Flex gap={8}>
						<Input
							style={{ maxWidth: "25%" }}
							prefix={<SearchOutlined />}
							placeholder={"Поиск..."}
						/>
						<Select
							style={{ maxWidth: "20%", width: "100%" }}
							placeholder={"Сортировка"}
						/>
					</Flex>
				)}
				dataSource={orders?.data}
				onRow={() => ({
					style: {
						cursor: "pointer"
					}
				})}
				expandable={{
					rowExpandable: (record) => record?.booking_rooms.length > 0,
					expandRowByClick: true,
					expandedRowRender: (record) => (
						<List<Room>
							rowKey={"id"}
							dataSource={record?.booking_rooms}
							renderItem={(item) => (
								<List.Item
									extra={
										<Title level={5}>
											{formatPriceWithCurrency(item?.room_price)}
										</Title>
									}
								>
									<Row gutter={16} style={{ width: "90%" }}>
										<Col span={12}>
											<Space>
												<Avatar shape={"square"} icon={<InboxOutlined />} />
												<Title level={5}>{item.room_type}</Title>
											</Space>
										</Col>
										<Col span={12}>
											<Space>
												<Avatar icon={<UserOutlined />} />
												<Flex vertical={true}>
													<Title level={5}>
														{item.guest_name ||
															`${record?.user?.first_name} ${record?.user?.last_name}`}
													</Title>
													<Text type={"secondary"}>
														Количество гостей: {item.guest_quantity}
													</Text>
												</Flex>
											</Space>
										</Col>
									</Row>
								</List.Item>
							)}
						/>
					)
				}}
				columns={columns}
			/>
		</>
	)
}

export { OrdersTable }
