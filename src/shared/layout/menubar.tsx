import { MenuOutlined } from "@ant-design/icons"
import { useLocation, useNavigate, useParams } from "@tanstack/react-router"
import Menu from "antd/es/menu"
import { type FC, useMemo } from "react"
import { menuData } from "src/shared/data"

const Menubar: FC = () => {
	const { pathname } = useLocation()
	const { hotelSlug = "" } = useParams({
		strict: false
	})
	const navigate = useNavigate()

	const menuItems =
		useMemo(() => {
			return menuData?.map((el) => ({
				...el,
				key: el?.key?.toString()?.replace("$hotelSlug", hotelSlug)
			}))
		}, [hotelSlug]) || []

	const onSelectMenu = (key: string) => {
		navigate({
			to: key,
			params: {
				hotelSlug
			},
			ignoreBlocker: true
		})
	}
	return (
		<>
			<Menu
				theme={"light"}
				mode={"horizontal"}
				overflowedIndicator={<MenuOutlined style={{ paddingInline: 16 }} />}
				selectedKeys={[pathname]}
				onSelect={(item) => onSelectMenu(item.key)}
				items={menuItems}
			/>
		</>
	)
}

export { Menubar }
