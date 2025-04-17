import { PlusOutlined, SearchOutlined } from "@ant-design/icons"
import { useNavigate, useParams } from "@tanstack/react-router"
import { Button, Flex, Input, List } from "antd"
import { type FC } from "react"
import { type Room, useGetRoomsQuery } from "src/services/rooms"
import { RoomsListItem } from "./rooms-list-item"

const RoomsList: FC = () => {
	const navigate = useNavigate()
	const { hotelSlug } = useParams({
		from: "/_layout/hotels/$hotelSlug/_hotel-layout/rooms/"
	})

	const {
		data: rooms = {
			data: []
		},
		isLoading,
		isFetching
	} = useGetRoomsQuery(hotelSlug)

	return (
		<>
			<List<Room>
				rowKey={"id"}
				header={
					<Flex gap={8} justify={"space-between"}>
						<Input
							style={{ maxWidth: "25%" }}
							prefix={<SearchOutlined />}
							placeholder={"Поиск..."}
						/>
						<Button
							icon={<PlusOutlined />}
							onClick={() =>
								navigate({
									to: "/hotels/$hotelSlug/rooms/new",
									params: {
										hotelSlug
									}
								})
							}
						>
							Добавить
						</Button>
					</Flex>
				}
				pagination={{
					pageSize: 10
				}}
				loading={isLoading || isFetching}
				dataSource={rooms?.data}
				renderItem={(item, index) => <RoomsListItem data={item} key={index} />}
			/>
		</>
	)
}

export { RoomsList }
