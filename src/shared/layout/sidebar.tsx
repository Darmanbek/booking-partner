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
import Flex from "antd/es/flex"
import Menu, { type MenuProps } from "antd/es/menu"
import { createElement, type FC } from "react"
import { useToken } from "src/shared/hooks"
import { Logo } from "src/widgets/logo"
import { SidebarContainer } from "./sidebar/sidebar-container"

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

const Sidebar: FC = () => {
	const { token } = useToken()
	return (
		<SidebarContainer>
			<Flex
				style={{
					padding: "16px 24px"
				}}
			>
				<Logo />
			</Flex>
			<Menu
				theme={"dark"}
				mode={"inline"}
				style={{
					backgroundColor: token.blue10
				}}
				defaultSelectedKeys={["4"]}
				items={items}
			/>
		</SidebarContainer>
	)
}

export { Sidebar }
