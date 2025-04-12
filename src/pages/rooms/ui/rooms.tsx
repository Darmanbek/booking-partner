import { type FC } from "react"
import { useGetRoomsQuery } from "src/services/rooms"
import { RoomsList } from "./lists"

const Rooms: FC = () => {
	const {
		data: rooms = {
			data: []
		},
		isLoading,
		isFetching
	} = useGetRoomsQuery()
	return (
		<>
			<RoomsList data={rooms?.data} loading={isLoading || isFetching} />
		</>
	)
}

export { Rooms }
