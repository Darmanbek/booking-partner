import Layout from "antd/es/layout"
import { type FC, type PropsWithChildren } from "react"

const InnerLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Layout
			style={{
				height: "100vh",
				overflowX: "hidden",
				overflowY: "auto"
			}}
		>
			{children}
		</Layout>
	)
}

export { InnerLayout }
