import { LogoutOutlined, UserOutlined } from "@ant-design/icons"
import Avatar from "antd/es/avatar"
import Flex from "antd/es/flex"
import Menu from "antd/es/menu"
import Popover from "antd/es/popover"
import Space from "antd/es/space"
import Typography from "antd/es/typography"
import { type FC } from "react"

const ProfileAvatar: FC = () => {
	return (
		<>
			<Popover
				placement={"bottomRight"}
				trigger={"click"}
				arrow={false}
				styles={{
					root: {
						width: 200
					}
				}}
				content={
					<>
						<Space>
							<Avatar icon={<UserOutlined />} />
							<Flex vertical={true}>
								<Typography.Text>Admin</Typography.Text>
								<Typography.Text type={"secondary"} style={{ fontSize: 12 }}>
									+998 90 123 45 67
								</Typography.Text>
							</Flex>
						</Space>
						<Menu
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
									label: "Profile"
								},
								{
									key: "/logout",
									danger: true,
									icon: <LogoutOutlined />,
									label: "Logout"
								}
							]}
						/>
					</>
				}
			>
				<Space style={{ cursor: "pointer" }}>
					<Avatar icon={<UserOutlined />} />
					<Typography.Text>Admin</Typography.Text>
				</Space>
			</Popover>
		</>
	)
}

export { ProfileAvatar }
