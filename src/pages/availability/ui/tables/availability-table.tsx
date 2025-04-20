import { CalendarOutlined } from "@ant-design/icons"
import { useParams } from "@tanstack/react-router"
import { Checkbox, DatePicker, Flex, Space, Table } from "antd"
import Button from "antd/es/button"
import dayjs from "dayjs"
import { type FC, useMemo, useState } from "react"
import { useAvailabilityTableColumns } from "src/pages/availability/hooks"
import {
	type Chessboard,
	type ChessboardActiveBooking,
	useGetChessboardActiveBookingsQuery,
	useGetChessboardQuery
} from "src/services/chessboard"
import { type Room, useGetRoomsQuery } from "src/services/rooms"

export type DataRoom = Room & {
	chessboard?: Chessboard
	active_booking?: ChessboardActiveBooking
}

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
	// console.log(date.startOf("month").format("YYYY-MM-DD"))
	// console.log(date.endOf("month").format("YYYY-MM-DD"))
	const onChangeDays = (date: number, value: boolean) => {
		setDays((prev) =>
			prev.map((el) => ({
				...el,
				value: el.date === date ? value : el.value
			}))
		)
	}

	const { data: rooms, isLoading, isFetching } = useGetRoomsQuery(hotelSlug)
	const { data: chess, isLoading: chessLoading } =
		useGetChessboardQuery(hotelSlug)
	const { data: chessActiveBookings, isLoading: chessActiveBookingsLoading } =
		useGetChessboardActiveBookingsQuery(hotelSlug, {
			start_date: date.startOf("month").format("YYYY-MM-DD"),
			end_date: date.endOf("month").format("YYYY-MM-DD")
		})

	const dataRooms: DataRoom[] = useMemo(() => {
		if (!rooms?.data) return []
		return rooms?.data.map((room) => ({
			...room,
			chessboard: chess?.data?.find((item) => item?.room_id === room?.id),
			active_booking: chessActiveBookings?.data?.find(
				(el) => el.room_id === room?.id
			)
		}))
	}, [chess?.data, rooms?.data, chessActiveBookings?.data])

	const columns = useAvailabilityTableColumns(
		date,
		days.filter((el) => el.value).map((el) => el.date)
	)
	return (
		<>
			<Table<DataRoom>
				rowKey={"id"}
				loading={
					isLoading || isFetching || chessLoading || chessActiveBookingsLoading
				}
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
				dataSource={dataRooms}
				scroll={{
					x: "auto"
				}}
			/>
		</>
	)
}

export { AvailabilityTable }
