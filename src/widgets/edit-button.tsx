import { EditOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { useResponsive } from "antd-style"
import { type FC } from "react"
import {
	type FormKeys,
	type FormParams,
	useFormDevtoolsStore
} from "src/shared/store"

interface EditButtonProps {
	params?: FormParams
	formKey?: FormKeys
}

const EditButton: FC<EditButtonProps> = ({ params, formKey }) => {
	const { mobile = false } = useResponsive()
	const setParams = useFormDevtoolsStore((state) => state.setParams)

	const onChangeParams = () => {
		if (!params) return
		setParams(params, formKey)
	}

	return (
		<>
			<Button type={"text"} icon={<EditOutlined />} onClick={onChangeParams}>
				{mobile ? "" : "Редактировать"}
			</Button>
		</>
	)
}

export { EditButton }
