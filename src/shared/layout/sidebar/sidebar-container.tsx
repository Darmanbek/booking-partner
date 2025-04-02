import Sider from "antd/es/layout/Sider"
import type { FC, PropsWithChildren } from "react"
import { useToken } from "src/shared/hooks"

const SidebarContainer: FC<PropsWithChildren> = ({ children }) => {
	const { token } = useToken()
	return (
		<Sider
			breakpoint={"lg"}
			width={256}
			style={{
				backgroundColor: token.blue10,
				boxShadow: token.boxShadow,
				overflowX: "hidden",
				overflowY: "auto",
				height: "100vh",
				position: "sticky",
				insetInlineStart: 0,
				top: 0,
				bottom: 0,
				scrollbarWidth: "thin",
				scrollbarGutter: "stable"
			}}
		>
			{children}
		</Sider>
	)
}

export { SidebarContainer }
