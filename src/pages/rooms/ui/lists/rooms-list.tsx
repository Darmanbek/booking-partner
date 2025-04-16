import { PlusOutlined, SearchOutlined } from "@ant-design/icons"
import { useNavigate, useParams } from "@tanstack/react-router"
import { Button, Flex, Input, List, type ListProps } from "antd"
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
	const navigate = useNavigate()
	const { hotelSlug } = useParams({
		from: "/_layout/hotels/$hotelSlug/_hotel-layout/rooms/"
	})

	return (
		<>
			<List<Room>
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
				pagination={pagination}
				loading={loading}
				dataSource={data}
				renderItem={(item, index) => <RoomsListItem data={item} key={index} />}
			/>
		</>
	)
}

export { RoomsList }
