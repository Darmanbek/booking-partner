import { Link } from "@tanstack/react-router"
import { Button, Space } from "antd"
import { type FC } from "react"

const AuthButtons: FC = () => {
	return (
		<>
			<Space>
				<Link to={"/auth/register"}>
					<Button type={"primary"}>Зарегистрироваться</Button>
				</Link>
				<Link to={"/auth/login"}>
					<Button>Войти</Button>
				</Link>
			</Space>
		</>
	)
}

export { AuthButtons }
