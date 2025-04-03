import Layout from "antd/es/layout"
import { type FC, type PropsWithChildren } from "react"

const InnerLayout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Layout
			style={{
				minHeight: "100vh"
			}}
		>
			{children}
		</Layout>
	)
}

export { InnerLayout }
