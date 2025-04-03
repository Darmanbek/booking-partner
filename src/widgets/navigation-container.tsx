import { useLocation, useNavigate } from "@tanstack/react-router"
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
	const { pathname } = useLocation()
	const navigate = useNavigate()

	const { token } = useToken()
	return (
		<Flex gap={token.paddingLG} {...props}>
			<Flex vertical={true} style={{ flexBasis: 256 }}>
				<Menu
					selectedKeys={[pathname]}
					style={{ borderRadius: token.borderRadiusLG }}
					onSelect={(item) => navigate({ to: item.key })}
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
