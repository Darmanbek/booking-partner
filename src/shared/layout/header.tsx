import { Flex, Space } from "antd"
import { Header as LayoutHeader } from "antd/es/layout/layout"
import { type FC } from "react"
import { useToken } from "src/shared/hooks"
import { Logo } from "src/widgets/logo"
import { BellButton } from "./header/bell-button"
import { MenuButton } from "./header/menu-button"
import { ProfileAvatar } from "./header/profile-avatar"

const Header: FC = () => {
	const { token } = useToken()
	return (
		<LayoutHeader
			style={{
				backgroundColor: token.colorBgContainer,
				paddingInline: token.paddingLG
			}}
		>
			<Flex align={"center"} gap={8} justify={"space-between"}>
				<Space>
					<MenuButton />
					<Logo />
				</Space>

				<Space>
					<BellButton />
					<ProfileAvatar />
				</Space>
			</Flex>
		</LayoutHeader>
	)
}

export { Header }
