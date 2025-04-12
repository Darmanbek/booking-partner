import { MenuOutlined } from "@ant-design/icons"
import { useLocation, useNavigate } from "@tanstack/react-router"
import { useResponsive } from "antd-style"
import Flex from "antd/es/flex"
import { type FlexProps } from "antd/es/flex/interface"
import Menu, { type MenuProps } from "antd/es/menu"
import { type FC } from "react"
import { useToken } from "src/shared/hooks"

interface NavigationContainerProps extends FlexProps {
	menuProps?: MenuProps
}

const NavigationContainer: FC<NavigationContainerProps> = ({
	menuProps,
	children,
	...props
}) => {
	const { md = true } = useResponsive()
	const { pathname } = useLocation()
	const navigate = useNavigate()

	const { token } = useToken()
	return (
		<Flex vertical={!md} gap={token.paddingLG} {...props}>
			<Flex vertical={true} style={{ flexBasis: md ? 256 : "auto" }}>
				<Menu
					selectedKeys={[pathname]}
					mode={md ? "vertical" : "horizontal"}
					overflowedIndicator={<MenuOutlined style={{ paddingInline: 16 }} />}
					style={{ borderRadius: token.borderRadiusLG }}
					onSelect={(item) => navigate({ to: item.key, ignoreBlocker: true })}
					{...menuProps}
				/>
			</Flex>
			<Flex vertical={true} flex={1} gap={token.paddingLG}>
				{children}
			</Flex>
		</Flex>
	)
}

export { NavigationContainer }
