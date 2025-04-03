import { MenuOutlined } from "@ant-design/icons"
import { useLocation, useNavigate } from "@tanstack/react-router"
import Menu from "antd/es/menu"
import { type FC } from "react"
import { menuData } from "src/shared/data"

const Menubar: FC = () => {
	const { pathname } = useLocation()
	const navigate = useNavigate()

	const onSelectMenu = (key: string) => {
		navigate({
			to: key
		})
	}

	const activeKey =
		menuData
			.find((el) => (pathname.startsWith(`${el?.key}`) ? pathname : ""))
			?.key?.toString() || ""

	return (
		<>
			<Menu
				theme={"light"}
				mode={"horizontal"}
				overflowedIndicator={<MenuOutlined style={{ paddingInline: 16 }} />}
				selectedKeys={[activeKey]}
				onSelect={(item) => onSelectMenu(item.key)}
				items={menuData}
			/>
		</>
	)
}

export { Menubar }
