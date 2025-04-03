import Layout from "antd/es/layout"
import { type FC, type PropsWithChildren } from "react"

const MainLayout: FC<PropsWithChildren> = ({ children }) => (
	<Layout hasSider={true} style={{ minHeight: "100vh" }}>
		{children}
	</Layout>
)

export { MainLayout }
