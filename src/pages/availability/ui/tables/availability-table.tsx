import { CalendarOutlined } from "@ant-design/icons"
import { useParams } from "@tanstack/react-router"
import { Checkbox, DatePicker, Flex, Space, Table } from "antd"
import Button from "antd/es/button"
import dayjs from "dayjs"
import { type FC, useState } from "react"
import { useAvailabilityTableColumns } from "src/pages/availability/hooks"
import { useGetChessboardQuery } from "src/services/chessboard"
import { type Room, useGetRoomsQuery } from "src/services/rooms"

const AvailabilityTable: FC = () => {
	const { hotelSlug } = useParams({
		from: "/_layout/hotels/$hotelSlug/_hotel-layout/availability"
	})

	const [days, setDays] = useState(
		[1, 2, 3, 4, 5, 6, 0].map((el, index) => ({
			date: el,
			name: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"][index],
			value: true
		}))
	)
	const [date, setDate] = useState(() => dayjs())

	const onChangeDays = (date: number, value: boolean) => {
		setDays((prev) =>
			prev.map((el) => ({
				...el,
				value: el.date === date ? value : el.value
			}))
		)
	}

	const { data: rooms, isLoading, isFetching } = useGetRoomsQuery(hotelSlug)
	const { data: chessboard, isLoading: chessLoading } =
		useGetChessboardQuery(hotelSlug)

	const columns = useAvailabilityTableColumns(
		date,
		days.filter((el) => el.value).map((el) => el.date),
		chessboard?.data
	)
	return (
		<>
			<Table<Room>
				rowKey={"id"}
				loading={isLoading || isFetching || chessLoading}
				title={() => (
					<Flex justify={"space-between"}>
						<Space>
							{days.map((day, index) => (
								<Checkbox
									checked={day.value}
									onChange={(e) => onChangeDays(day.date, e.target.checked)}
									key={index}
								>
									{day.name}
								</Checkbox>
							))}
						</Space>
						<Space.Compact>
							<DatePicker
								value={date}
								onChange={setDate}
								picker={"month"}
								format={"YYYY MMMM"}
							/>
							<Button
								type={"primary"}
								icon={<CalendarOutlined />}
								onClick={() => setDate(() => dayjs())}
							/>
						</Space.Compact>
					</Flex>
				)}
				columns={columns}
				dataSource={rooms?.data}
				scroll={{
					x: "auto"
				}}
			/>
		</>
	)
}

export { AvailabilityTable }
