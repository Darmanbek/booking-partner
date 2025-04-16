import {
	HomeOutlined,
	InboxOutlined,
	InsertRowAboveOutlined,
	OrderedListOutlined
} from "@ant-design/icons"
import type { MenuProps } from "antd"

type MenuItem = Required<MenuProps>["items"][number] & {
	key: string
}

export const menuData: MenuItem[] = [
	{
		key: "/hotels/$hotelSlug",
		icon: <HomeOutlined />,
		label: "Отель"
	},
	{
		key: "/hotels/$hotelSlug/availability-prices",
		icon: <InsertRowAboveOutlined />,
		label: "Доступность и цены"
	},
	{
		key: "/hotels/$hotelSlug/orders",
		icon: <OrderedListOutlined />,
		label: "Бронирования"
	},
	{
		key: "/hotels/$hotelSlug/rooms",
		icon: <InboxOutlined />,
		label: "Номера"
	}
]
