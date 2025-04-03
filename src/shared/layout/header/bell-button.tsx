import { BellOutlined } from "@ant-design/icons"
import Button from "antd/es/button"
import { type FC } from "react"

const BellButton: FC = () => {
	return (
		<>
			<Button type={"text"} icon={<BellOutlined />} />
		</>
	)
}

export { BellButton }
