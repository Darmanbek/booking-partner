import { List, type ListProps } from "antd"
import { type FC } from "react"
import { type Room } from "src/services/rooms"
import { RoomsListItem } from "./rooms-list-item"

interface HotelsListProps {
	data: Room[]
	loading?: boolean
	pagination?: ListProps<Room>["pagination"]
}

const RoomsList: FC<HotelsListProps> = ({
	data,
	loading,
	pagination = {
		pageSize: 10
	}
}) => {
	return (
		<>
			<List<Room>
				pagination={pagination}
				loading={loading}
				dataSource={data}
				renderItem={(item, index) => <RoomsListItem data={item} key={index} />}
			/>
		</>
	)
}

export { RoomsList }
