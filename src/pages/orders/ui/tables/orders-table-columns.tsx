import {
	CheckOutlined,
	ExclamationCircleFilled,
	MoonFilled,
	SyncOutlined,
	UserOutlined
} from "@ant-design/icons"
import { Flex, Space, Typography } from "antd"
import Avatar from "antd/es/avatar"
import type { ColumnsType } from "antd/es/table"
import {
	type Booking,
	useEditBookingsStatusMutation
} from "src/services/bookings"
import { useTranslation } from "src/shared/hooks"
import { formatPriceWithCurrency } from "src/shared/utils"
import { MoreButton } from "src/widgets/more-button"

export const useOrdersTableColumns = () => {
	const { t } = useTranslation()

	const { mutate: editBookingStatus } = useEditBookingsStatusMutation()

	const columns: ColumnsType<Booking> = [
		{
			title: "Бронирование",
			dataIndex: "id",
			key: "id",
			render: (_v, record) => (
				<Flex vertical={true}>
					<Space>
						{record?.status === "booked" ? (
							<>
								<SyncOutlined spin={true} style={{ color: "blue" }} />
							</>
						) : record?.status === "completed" ? (
							<>
								<CheckOutlined style={{ color: "green" }} />
							</>
						) : (
							<>
								<ExclamationCircleFilled style={{ color: "orange" }} />
							</>
						)}
						<Typography.Title level={5}>{t(record?.status)}</Typography.Title>
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
			title: "Номера",
			dataIndex: "rooms_count",
			key: "rooms_count"
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
			width: 50,
			title: "",
			key: "actions",
			render: (_v, record) => (
				<Space onClick={(e) => e.stopPropagation()}>
					<MoreButton
						onComplete={() =>
							editBookingStatus({
								id: record?.id,
								type: "complete"
							})
						}
						onCancel={() =>
							editBookingStatus({
								id: record?.id,
								type: "cancel"
							})
						}
					/>
				</Space>
			)
		}
	]

	return columns
}
