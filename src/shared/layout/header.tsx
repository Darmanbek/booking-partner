import { Divider, Flex, Space } from "antd"
import { useResponsive } from "antd-style"
import { Header as LayoutHeader } from "antd/es/layout/layout"
import Title from "antd/es/typography/Title"
import { type FC } from "react"
import { useGetHotelsQuery } from "src/services/hotels"
import { useGetMeQuery } from "src/services/partners"
import { useToken, useTranslation } from "src/shared/hooks"
import { Logo } from "src/widgets/logo"
import { BellButton } from "./header/bell-button"
import { ProfileAvatar } from "./header/profile-avatar"

const Header: FC = () => {
	const { token } = useToken()
	const { t } = useTranslation()
	const { mobile = false } = useResponsive()
	const { data: profile } = useGetMeQuery()
	const { data: hotel } = useGetHotelsQuery({
		has_hotel: profile?.data?.has_hotel
	})

	return (
		<LayoutHeader
			style={{
				backgroundColor: token.colorBgContainer,
				paddingInline: token.paddingLG,
				whiteSpace: "nowrap"
			}}
		>
			<Flex align={"center"} gap={8} justify={"space-between"}>
				<Space>
					<Logo collapsed={mobile} />
					{hotel && (
						<>
							<Divider type={"vertical"} />
							<Title level={4}>Отель: {t(hotel?.data?.name)}</Title>
						</>
					)}
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
