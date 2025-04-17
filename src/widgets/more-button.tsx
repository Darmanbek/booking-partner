import { DeleteOutlined, EditFilled, MoreOutlined } from "@ant-design/icons"
import { App, Button, Dropdown } from "antd"
import type { FC, ReactNode } from "react"

interface MoreButtonProps {
	onEdit?: () => void
	confirm?: {
		title: string
		content?: ReactNode
		onConfirm: () => void
	}
}

const MoreButton: FC<MoreButtonProps> = ({ onEdit, confirm }) => {
	const { modal } = App.useApp()

	const onDelete = () => {
		if (!confirm) return
		modal.confirm({
			title: confirm?.title,
			content: confirm?.content,
			onOk: confirm.onConfirm,
			centered: true,
			okButtonProps: {
				danger: true
			},
			okText: "Удалить"
		})
	}

	return (
		<>
			<Dropdown
				trigger={["click"]}
				menu={{
					items: [
						{
							key: "edit",
							label: "Изменить",
							icon: <EditFilled />,
							onClick: onEdit
						},
						{
							key: "delete",
							danger: true,
							label: "Удалить",
							icon: <DeleteOutlined />,
							onClick: onDelete
						}
					]
				}}
			>
				<Button
					iconPosition={"end"}
					type={"text"}
					icon={<MoreOutlined style={{ fontSize: 24 }} />}
					key={"link"}
				/>
			</Dropdown>
		</>
	)
}

export { MoreButton }
