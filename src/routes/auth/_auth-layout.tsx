import { createFileRoute, Outlet } from "@tanstack/react-router"
import { Flex } from "antd"
import { useState } from "react"
import { VerifyContext } from "src/pages/auth"
import { Footer, Header, InnerLayout, MainContent } from "src/shared/layout"
import { Container } from "src/shared/ui"

export const Route = createFileRoute("/auth/_auth-layout")({
	component: RouteComponent
})

function RouteComponent() {
	const [remember, setRemember] = useState(false)
	const [phoneNumber, setPhoneNumber] = useState("")
	const [isVerify, setIsVerify] = useState(false)

	return (
		<VerifyContext.Provider
			value={{
				remember,
				isVerify,
				setPhoneNumber,
				setRemember,
				setIsVerify,
				phoneNumber
			}}
		>
			<InnerLayout>
				<Header auth={false} />
				<MainContent>
					<Container>
						<Flex justify={"center"}>
							<Outlet />
						</Flex>
					</Container>
				</MainContent>
				<Footer />
			</InnerLayout>
		</VerifyContext.Provider>
	)
}
