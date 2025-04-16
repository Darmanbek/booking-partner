import { useParams } from "@tanstack/react-router"
import { Divider, Flex, Space } from "antd"
import { useResponsive } from "antd-style"
import { Header as LayoutHeader } from "antd/es/layout/layout"
import Title from "antd/es/typography/Title"
import { type FC } from "react"
import { useGetHotelsBySlugQuery } from "src/services/hotels"
import { useToken, useTranslation } from "src/shared/hooks"
import { Logo } from "src/widgets/logo"
import { BellButton } from "./header/bell-button"
import { ProfileAvatar } from "./header/profile-avatar"

const Header: FC = () => {
	const { token } = useToken()
	const { hotelSlug } = useParams({
		strict: false
	})
	const { t } = useTranslation()
	const { mobile = false } = useResponsive()
	const {
		data: hotel,
		isLoading,
		isFetching
	} = useGetHotelsBySlugQuery(hotelSlug)

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
					{hotel && hotelSlug && (
						<>
							<Divider type={"vertical"} />
							<Title level={4}>
								Отель:{" "}
								{isLoading || isFetching ? "Загрузка" : t(hotel?.data?.name)}
							</Title>
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
