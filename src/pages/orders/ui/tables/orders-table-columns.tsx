import {
	CheckOutlined,
	MoonFilled,
	MoreOutlined,
	UserOutlined
} from "@ant-design/icons"
import { Button, Flex, Space, Typography } from "antd"
import Avatar from "antd/es/avatar"
import type { ColumnsType } from "antd/es/table"
import type { Order } from "src/shared/data"
import { formatPriceWithCurrency } from "src/shared/utils"

export const useOrdersTableColumns = () => {
	const columns: ColumnsType<Order> = [
		{
			title: "Бронирование",
			dataIndex: "id",
			key: "id",
			render: (value, record) => (
				<Flex vertical={true}>
					<Space>
						<CheckOutlined style={{ color: "green" }} />
						<Typography.Title level={5}>{value}</Typography.Title>
					</Space>
					<Typography.Text type={"secondary"}>
						{`Создано: ${record.created_at}`}
					</Typography.Text>
				</Flex>
			)
		},
		{
			title: "Гости",
			dataIndex: "user",
			key: "user",
			render: (value: Order["user"], record) => (
				<Flex vertical={true}>
					<Space>
						<Avatar icon={<UserOutlined />} />
						<Typography.Title
							level={5}
						>{`${value.first_name} ${value.last_name}`}</Typography.Title>
					</Space>
					<Typography.Text type={"secondary"}>
						{`Гостей: ${record.guest_count}`}
					</Typography.Text>
				</Flex>
			)
		},
		{
			title: "Номер",
			dataIndex: "room_type",
			key: "room_type"
		},
		{
			title: "Даты проживания",
			dataIndex: "dates",
			key: "dates",
			render: (value: Order["dates"]) => (
				<Flex vertical={true}>
					<Typography.Title
						level={5}
						style={{ fontSize: "inherit" }}
					>{`${value.check_in} - ${value.check_out}`}</Typography.Title>
					<Typography.Text type={"secondary"}>
						<Space>
							<MoonFilled />
							{`Ночей: ${value.night_count}`}
						</Space>
					</Typography.Text>
				</Flex>
			)
		},
		{
			title: "Стоимость",
			dataIndex: "price",
			key: "price",
			render: (value, record) => (
				<Flex vertical={true}>
					<Typography.Title level={5} style={{ fontSize: "inherit" }}>
						{formatPriceWithCurrency(value)}
					</Typography.Title>
					<Typography.Text type={"secondary"}>
						{record.payment_type}
					</Typography.Text>
				</Flex>
			)
		},
		{
			title: "",
			key: "actions",
			render: () => (
				<>
					<Button
						type={"text"}
						icon={<MoreOutlined style={{ fontSize: 21 }} />}
					/>
				</>
			)
		}
	]

	return columns
}
