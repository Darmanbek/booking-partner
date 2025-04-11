import {
	LoadingOutlined,
	LogoutOutlined,
	UserOutlined
} from "@ant-design/icons"
import { useNavigate } from "@tanstack/react-router"
import Avatar from "antd/es/avatar"
import Flex from "antd/es/flex"
import Menu from "antd/es/menu"
import Popover from "antd/es/popover"
import Space from "antd/es/space"
import Typography from "antd/es/typography"
import { type FC, useEffect } from "react"
import { useGetMeQuery, useLogoutMutation } from "src/services/partners"
import { useAuth } from "src/shared/hooks"
import { formatPhone } from "src/shared/utils"

const ProfileAvatar: FC = () => {
	const navigate = useNavigate()
	const auth = useAuth()
	const { data: profile, isLoading } = useGetMeQuery()

	const { mutate: logout, isPending, isSuccess } = useLogoutMutation()

	const onSelectMenu = (key: string) => {
		if (key === "/logout") {
			logout()
			return
		}
		navigate({
			to: key
		})
	}

	useEffect(() => {
		if (isSuccess) {
			auth.logout()
		}
	}, [auth, isSuccess])
	return (
		<>
			<Popover
				placement={"bottomRight"}
				trigger={"click"}
				arrow={false}
				styles={{
					root: {
						width: 220
					}
				}}
				content={
					<>
						<Space>
							<Avatar icon={<UserOutlined />} />
							<Flex vertical={true}>
								<Typography.Text>
									{isLoading
										? ""
										: profile
											? `${profile.data.first_name} ${profile.data.last_name}`
											: ""}
								</Typography.Text>
								<Typography.Text type={"secondary"} style={{ fontSize: 12 }}>
									{formatPhone(profile?.data?.phone_number)}
								</Typography.Text>
							</Flex>
						</Space>
						<Menu
							onSelect={(item) => onSelectMenu(item.key)}
							items={[
								{
									type: "divider",
									style: {
										marginTop: 8
									}
								},
								{
									key: "/profile",
									icon: <UserOutlined />,
									label: "Профиль"
								},
								{
									key: "/logout",
									danger: true,
									icon: isPending ? (
										<LoadingOutlined spin={true} />
									) : (
										<LogoutOutlined />
									),
									label: "Выйти"
								}
							]}
						/>
					</>
				}
			>
				<Space style={{ cursor: "pointer" }}>
					<Avatar
						icon={
							isLoading ? <LoadingOutlined spin={true} /> : <UserOutlined />
						}
					/>
					<Typography.Text>
						{isLoading
							? ""
							: profile
								? `${profile.data.first_name} ${profile.data.last_name}`
								: ""}
					</Typography.Text>
				</Space>
			</Popover>
		</>
	)
}

export { ProfileAvatar }
