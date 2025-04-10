import { useNavigate } from "@tanstack/react-router"
import Layout from "antd/es/layout"
import { Content, Footer, Header } from "antd/es/layout/layout"
import type { FC, PropsWithChildren } from "react"
import { useToken } from "src/shared/hooks"
import { Button, Flex, Space } from "src/shared/ui"
import { Logo } from "src/widgets/logo"

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
	const navigate = useNavigate()
	const { token } = useToken()
	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Header
				style={{
					paddingInline: token.paddingLG,
					backgroundColor: token.colorBgContainer
				}}
			>
				<Flex align={"center"} justify={"space-between"} gap={8}>
					<Logo />
					<Space>
						<Button
							type={"primary"}
							onClick={() =>
								navigate({
									to: "/auth/register"
								})
							}
						>
							Зарегистрироваться
						</Button>
						<Button
							onClick={() =>
								navigate({
									to: "/auth/login"
								})
							}
						>
							Войти
						</Button>
					</Space>
				</Flex>
			</Header>
			<Content style={{ padding: token.paddingLG }}>
				<Flex justify={"center"}>{children}</Flex>
			</Content>
			<Footer style={{ textAlign: "center" }}>Booking Admin ©2025</Footer>
		</Layout>
	)
}

export { AuthLayout }
