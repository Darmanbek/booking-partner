import {
	AppstoreOutlined,
	BarChartOutlined,
	CloudOutlined,
	ShopOutlined,
	TeamOutlined,
	UploadOutlined,
	UserOutlined,
	VideoCameraOutlined
} from "@ant-design/icons"
import { Menu, type MenuProps } from "antd"
import { createElement, type FC } from "react"

const items: MenuProps["items"] = [
	UserOutlined,
	VideoCameraOutlined,
	UploadOutlined,
	BarChartOutlined,
	CloudOutlined,
	AppstoreOutlined,
	TeamOutlined,
	ShopOutlined
].map((icon, index) => ({
	key: String(index + 1),
	icon: createElement(icon),
	label: `nav ${index + 1}`
}))

const Menubar: FC = () => {
	return (
		<>
			<Menu
				theme={"light"}
				mode={"horizontal"}
				defaultSelectedKeys={["4"]}
				items={items}
			/>
		</>
	)
}

export { Menubar }
