import { Space } from "antd"
import type { ColumnsType } from "antd/es/table"
import { type Dayjs } from "dayjs"
import { AvailabilityButton } from "src/pages/availability/features"
import type { Chessboard } from "src/services/chessboard"
import { type Room } from "src/services/rooms"
import { useToken } from "src/shared/hooks"

export const useAvailabilityTableColumns = (
	date: Dayjs,
	disabledDays: number[],
	chessboard?: Chessboard[]
) => {
	const start = date.startOf("month")
	const days = date.daysInMonth()
	const { token } = useToken()

	const columns: ColumnsType<Room> = Array.from({ length: days }).map(
		(_, index) => {
			const date = start.add(index, "day")
			if (!disabledDays.includes(date.get("day"))) return {}
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
				render: (_v, record) => (
					<AvailabilityButton
						data={{
							room: record,
							date: date.format("YYYY-MM-DD"),
							chessRoom: chessboard?.find((el) => el?.room_id === record?.id)
						}}
					/>
				)
			}
		}
	)

	columns.unshift({
		title: "Номера",
		key: "rooms",
		dataIndex: "room_type",
		rowScope: "row",
		fixed: "left"
	})

	return columns.filter((el) => el?.key)
}
