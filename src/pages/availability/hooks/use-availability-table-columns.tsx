import { Divider, type GlobalToken, Space } from "antd"
import type { ColumnsType } from "antd/es/table"
import Typography from "antd/es/typography"
import { type Dayjs } from "dayjs"
import { useMemo } from "react"
import { AvailabilityButton } from "src/pages/availability/features"
import { useToken } from "src/shared/hooks"
import type { DataRoom } from "../ui/tables"

const generateCalendarColumns = (
	start: Dayjs,
	days: number,
	disabledDays: number[],
	token: GlobalToken
) => {
	const columns: ColumnsType<DataRoom> = Array.from({ length: days }).map(
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
							chessboard: record?.chessboard,
							active_booking: record?.active_booking
						}}
					/>
				)
			}
		}
	)

	return columns
}

export const useAvailabilityTableColumns = (
	date: Dayjs,
	disabledDays: number[]
) => {
	const start = date.startOf("month")
	const days = date.daysInMonth()
	const { token } = useToken()

	const columns: ColumnsType<DataRoom> = useMemo(
		() => generateCalendarColumns(start, days, disabledDays, token),
		[days, disabledDays, start, token]
	)

	columns.unshift({
		title: "Номера",
		key: "rooms",
		dataIndex: "room_type",
		rowScope: "row",
		onCell: () => ({
			style: {
				fontSize: 12,
				width: 100
			}
		}),
		fixed: "left",
		render: (value) => (
			<Space
				direction={"vertical"}
				split={<Divider style={{ margin: 0 }} type={"horizontal"} />}
			>
				{value}
				<Typography.Text style={{ fontSize: 11 }} type={"secondary"}>
					(Активные брони)
				</Typography.Text>
			</Space>
		)
	})

	return columns.filter((el) => el?.key)
}
