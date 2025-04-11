import { createFileRoute } from "@tanstack/react-router"
import { RegisterPage, VerifyPage } from "src/pages/auth"

export const Route = createFileRoute("/auth/_auth-layout/register")({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<>
			<VerifyPage />
			<RegisterPage />
		</>
	)
}
