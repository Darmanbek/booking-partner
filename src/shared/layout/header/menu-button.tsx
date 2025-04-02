import { MenuOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { type FC } from "react"

const MenuButton: FC = () => {
	return (
		<>
			<Button type={"text"} icon={<MenuOutlined />} />
		</>
	)
}

export { MenuButton }
