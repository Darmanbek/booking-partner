import { PhoneOutlined } from "@ant-design/icons"
import { Link, useNavigate } from "@tanstack/react-router"
import { Checkbox, Divider, Form, type FormProps } from "antd"
import { type FC, useEffect } from "react"
import { type LoginChange, useLoginMutation } from "src/services/partners"
import { useAuth } from "src/shared/hooks"
import { Button, Card, Flex, Input, InputPassword, Title } from "src/shared/ui"
import { formatFormPhone } from "src/shared/utils"

const Login: FC = () => {
	const [form] = Form.useForm<LoginChange>()
	const navigate = useNavigate()
	const auth = useAuth()
	const remember = Form.useWatch("remember", form)

	const {
		data: loginData,
		mutate: login,
		isPending: loginLoading,
		isSuccess
	} = useLoginMutation()

	const onFinish: FormProps<LoginChange>["onFinish"] = (values) => {
		if (values.phone_number) {
			values.phone_number = formatFormPhone(values.phone_number)
		}
		login(values)
	}

	useEffect(() => {
		if (isSuccess && loginData?.data) {
			auth.login(loginData?.data, remember)
			navigate({
				to: "/hotel",
				replace: true
			})
		}
	}, [auth, isSuccess, loginData, navigate, remember])
	return (
		<>
			<Card>
				<Title level={4} style={{ marginBottom: 20, whiteSpace: "nowrap" }}>
					Войти
				</Title>
				<Form
					autoComplete={"off"}
					layout={"vertical"}
					requiredMark={false}
					size={"large"}
					form={form}
					onFinish={onFinish}
					name={"login-form"}
					labelCol={{
						style: {
							display: "none"
						}
					}}
				>
					<Form.Item<LoginChange>
						label={"Телефон номер"}
						name={"phone_number"}
						rules={[{ required: true }]}
					>
						<Input
							addonBefore={"+998"}
							placeholder={"Телефон номер"}
							suffix={<PhoneOutlined />}
						/>
					</Form.Item>
					<Form.Item<LoginChange>
						label={"Пароль"}
						name={"password"}
						rules={[{ required: true }]}
					>
						<InputPassword placeholder={"Пароль"} />
					</Form.Item>
					<Form.Item<LoginChange>
						noStyle={true}
						valuePropName={"checked"}
						name={"remember"}
						initialValue={false}
					>
						<Checkbox style={{ marginBottom: 20 }}>Запомните меня</Checkbox>
					</Form.Item>
					<Form.Item noStyle={true}>
						<Button
							loading={loginLoading}
							type={"primary"}
							htmlType={"submit"}
							block={true}
						>
							Войти
						</Button>
					</Form.Item>
					<Divider />
					<Flex justify={"center"} gap={4}>
						У вас нет аккаунта? <Link to={"/auth/register"}>Регистрация</Link>
					</Flex>
				</Form>
			</Card>
		</>
	)
}

export { Login }
