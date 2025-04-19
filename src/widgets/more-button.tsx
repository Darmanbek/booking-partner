import {
	DeleteOutlined,
	EditFilled,
	EyeOutlined,
	MoreOutlined
} from "@ant-design/icons"
import { App, Button, Dropdown } from "antd"
import type { MenuItemType } from "antd/es/menu/interface"
import { type FC, type ReactNode, useCallback, useMemo } from "react"

interface MoreButtonProps {
	onEdit?: () => void
	confirm?: {
		title: string
		content?: ReactNode
		onConfirm: () => void
	}
	onOpen?: () => void
}

const MoreButton: FC<MoreButtonProps> = ({ onEdit, confirm, onOpen }) => {
	const { modal } = App.useApp()

	const onDelete = useCallback(() => {
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
	}, [confirm, modal])

	const menuItems = useMemo(() => {
		const items: MenuItemType[] = [
			{
				key: "edit",
				label: "Изменить",
				icon: <EditFilled />,
				onClick: onEdit
			}
		]

		if (onOpen) {
			items.unshift({
				key: "open",
				label: "Открыть",
				icon: <EyeOutlined />,
				onClick: onOpen
			})
		}

		if (confirm) {
			items.push({
				key: "delete",
				danger: true,
				label: "Удалить",
				icon: <DeleteOutlined />,
				onClick: onDelete
			})
		}

		return items
	}, [confirm, onDelete, onEdit, onOpen])

	return (
		<>
			<Dropdown
				trigger={["click"]}
				menu={{
					items: menuItems
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
