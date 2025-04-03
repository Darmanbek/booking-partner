import {
	DollarOutlined,
	HomeOutlined,
	InboxOutlined,
	InsertRowAboveOutlined,
	OrderedListOutlined
} from "@ant-design/icons"
import type { MenuProps } from "antd"

type MenuItem = Required<MenuProps>["items"][number]

export const menuData: MenuItem[] = [
	{
		key: "/hotel",
		icon: <HomeOutlined />,
		label: "Отель"
	},
	{
		key: "/availability-prices",
		icon: <InsertRowAboveOutlined />,
		label: "Доступность и цены"
	},
	{
		key: "/reservations",
		icon: <OrderedListOutlined />,
		label: "Бронирования"
	},
	{
		key: "/rooms",
		icon: <InboxOutlined />,
		label: "Номера"
	},
	{
		key: "/payments",
		icon: <DollarOutlined />,
		label: "Счета"
	}
]
