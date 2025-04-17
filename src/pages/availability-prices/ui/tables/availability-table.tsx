import { Checkbox, DatePicker, Flex, Space, Table } from "antd"
import dayjs from "dayjs"
import { type FC, useState } from "react"
import { type Room, useGetRoomsQuery } from "src/services/rooms"
import { useAvailabilityTableColumns } from "./availability-table-columns"

const AvailabilityTable: FC = () => {
	const [date, setDate] = useState(() => dayjs())

	const { data: rooms } = useGetRoomsQuery("")

	const columns = useAvailabilityTableColumns(date)
	return (
		<>
			<Table<Room>
				rowKey={"id"}
				title={() => (
					<Flex justify={"space-between"}>
						<Space>
							<Checkbox defaultChecked={true}>Пн</Checkbox>
							<Checkbox defaultChecked={true}>Вт</Checkbox>
							<Checkbox defaultChecked={true}>Ср</Checkbox>
							<Checkbox defaultChecked={true}>Чт</Checkbox>
							<Checkbox defaultChecked={true}>Пт</Checkbox>
							<Checkbox defaultChecked={true}>Сб</Checkbox>
							<Checkbox defaultChecked={true}>Вс</Checkbox>
						</Space>
						<Space>
							<DatePicker
								value={date}
								onChange={setDate}
								picker={"month"}
								format={"YYYY MMMM"}
							/>
						</Space>
					</Flex>
				)}
				columns={columns}
				dataSource={
					rooms?.data
						? [
								{
									key: 0,
									room_type: "Отель",
									base_price: 0,
									quantity: rooms.data?.reduce(
										(total, item) => total + item.quantity,
										0
									),
									room_area: 0,
									max_guests: 0,
									room_type_id: 1,
									id: 0,
									images: [],
									amenities: [],
									hotel_id: 0,
									use_dinamic_price: false
								},
								...rooms.data
							]
						: []
				}
				scroll={{
					x: "auto"
				}}
			/>
		</>
	)
}

export { AvailabilityTable }
