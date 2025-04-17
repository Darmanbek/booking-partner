import { DeleteFilled } from "@ant-design/icons"
import { Drawer, type DrawerProps, type FormInstance } from "antd"
import Button from "antd/es/button"
import Flex from "antd/es/flex"
import { type FC, useCallback, useEffect, useRef } from "react"
import { type FormKeys, useFormDevtoolsStore } from "src/shared/store"
import { useShallow } from "zustand/react/shallow"

interface FormDrawerProps extends DrawerProps {
	form: FormInstance
	formKey?: FormKeys
	loading?: boolean
	success?: boolean
}

const FormDrawer: FC<FormDrawerProps> = ({
	form,
	formKey = "main",
	loading,
	success,
	...props
}) => {
	const {
		open,
		resetParams,
		params,
		formKey: storeKey
	} = useFormDevtoolsStore(useShallow((state) => state))
	const resetRef = useRef(resetParams)

	const onCloseDrawer = useCallback(() => {
		resetParams()
		form.resetFields()
	}, [resetParams, form])

	useEffect(() => {
		resetRef.current = resetParams
	}, [resetParams])

	useEffect(() => {
		if (!loading && success) {
			resetRef.current()
			form.resetFields()
		}
	}, [form, loading, success])
	return (
		<Drawer
			width={375}
			open={open && storeKey === formKey}
			closeIcon={<DeleteFilled />}
			title={params ? "Изменить" : "Добавить"}
			onClose={onCloseDrawer}
			placement={"right"}
			styles={{
				body: {
					paddingBlock: 16
				}
			}}
			footer={
				<Flex gap={8} justify={"end"}>
					<Button>Отмена</Button>
					<Button type={"primary"} onClick={form.submit}>
						Сохранить
					</Button>
				</Flex>
			}
			{...props}
		/>
	)
}

export { FormDrawer }
