import { MenuOutlined } from "@ant-design/icons"
import { useNavigate, useParams } from "@tanstack/react-router"
import Menu from "antd/es/menu"
import { type FC, useMemo } from "react"
import { menuData } from "src/shared/data"

const Menubar: FC = () => {
	// const { pathname } = useLocation()
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

	// const activeKey =
	// 	menuItems
	// 		.find((el) =>
	// 			pathname === `${el?.key}`
	// 				? pathname
	// 				: pathname.startsWith(`${el?.key}`)
	// 					? el?.key
	// 					: ""
	// 		)
	// 		?.key?.toString() || ""

	return (
		<>
			<Menu
				theme={"light"}
				mode={"horizontal"}
				overflowedIndicator={<MenuOutlined style={{ paddingInline: 16 }} />}
				// selectedKeys={[activeKey]}
				onSelect={(item) => onSelectMenu(item.key)}
				items={menuItems}
			/>
		</>
	)
}

export { Menubar }
