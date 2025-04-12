import { Button, Space } from "antd"
import type { ColumnsType } from "antd/es/table"
import { type Dayjs } from "dayjs"
import { type Room } from "src/services/rooms"
import { useToken } from "src/shared/hooks"

export const usePricesTableColumns = (date: Dayjs) => {
	const start = date.startOf("month")
	const days = date.daysInMonth()
	const { token } = useToken()

	const columns: ColumnsType<Room> = Array.from({ length: days }).map(
		(_, index) => {
			const date = start.add(index, "day")
			return {
				align: "center",
				title: (
					<Space direction={"vertical"}>
						{index + 1}
						{date.format("dd")}
					</Space>
				),
				key: index + 1,
				onCell: () => ({
					style: {
						padding: 2
					}
				}),
				onHeaderCell: () => ({
					style: [0, 6].includes(date.day())
						? {
								color: token.red
							}
						: {}
				}),
				render: (_v, record, index) => (
					<Button
						variant={"solid"}
						color={record?.quantity == 0 ? "red" : "green"}
					>
						{index ? record?.quantity : null}
					</Button>
				)
			}
		}
	)

	columns.unshift({
		title: "",
		key: "rooms",
		dataIndex: "room_type",
		rowScope: "row",
		fixed: "left"
	})

	return columns
}
