import { createFileRoute, Outlet } from "@tanstack/react-router"
import { useState } from "react"
import { AuthLayout, VerifyContext } from "src/pages/auth"

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
			<AuthLayout>
				<Outlet />
			</AuthLayout>
		</VerifyContext.Provider>
	)
}
