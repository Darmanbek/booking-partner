import { CheckOutlined, MoonFilled, UserOutlined } from "@ant-design/icons"
import { Flex, Space, Typography } from "antd"
import Avatar from "antd/es/avatar"
import type { ColumnsType } from "antd/es/table"
import type { Booking } from "src/services/bookings"
import { useTranslation } from "src/shared/hooks"
import { formatPriceWithCurrency } from "src/shared/utils"
import { MoreButton } from "src/widgets/more-button"

export const useOrdersTableColumns = () => {
	const { t } = useTranslation()

	const columns: ColumnsType<Booking> = [
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
			render: (value: Booking["user"], record) => (
				<Flex vertical={true}>
					<Space>
						<Avatar icon={<UserOutlined />} />
						<Typography.Title
							level={5}
						>{`${value.first_name} ${value.last_name}`}</Typography.Title>
					</Space>
					<Typography.Text type={"secondary"}>
						{`Гостей: ${record.total_guests}`}
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
			key: "dates",
			render: (_v, record) => (
				<Flex vertical={true}>
					<Typography.Title
						level={5}
						style={{ fontSize: "inherit" }}
					>{`${record?.check_in_date} - ${record?.check_out_date}`}</Typography.Title>
					<Typography.Text type={"secondary"}>
						<Space>
							<MoonFilled />
							{`Ночей: ${record.total_days}`}
						</Space>
					</Typography.Text>
				</Flex>
			)
		},
		{
			title: "Стоимость",
			dataIndex: "total_price",
			key: "total_price",
			render: (value, record) => (
				<Flex vertical={true}>
					<Typography.Title level={5} style={{ fontSize: "inherit" }}>
						{formatPriceWithCurrency(value)}
					</Typography.Title>
					<Typography.Text type={"secondary"}>
						{t(record?.payment_method)}
					</Typography.Text>
				</Flex>
			)
		},
		{
			title: "",
			key: "actions",
			render: () => (
				<Space onClick={(e) => e.stopPropagation()}>
					<MoreButton onOpen={() => void 0} />
				</Space>
			)
		}
	]

	return columns
}
