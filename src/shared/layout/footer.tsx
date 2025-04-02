import { Footer as LayoutFooter } from "antd/es/layout/layout"
import { type FC } from "react"

const Footer: FC = () => {
	return (
		<LayoutFooter style={{ textAlign: "center" }}>
			Ant Design ©{new Date().getFullYear()} Created by Ant UED
		</LayoutFooter>
	)
}

export { Footer }
