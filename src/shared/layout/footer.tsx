import { Footer as LayoutFooter } from "antd/es/layout/layout"
import { type FC } from "react"

const Footer: FC = () => {
	return (
		<LayoutFooter style={{ textAlign: "center" }}>
			Booking Admin ©{new Date().getFullYear()}
		</LayoutFooter>
	)
}

export { Footer }
