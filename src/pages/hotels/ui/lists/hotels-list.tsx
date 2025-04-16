import { PlusOutlined } from "@ant-design/icons"
import { useNavigate } from "@tanstack/react-router"
import { Button, Flex, List, Typography } from "antd"
import { type FC } from "react"
import { type Hotel, useGetHotelsQuery } from "src/services/hotels"
import { HotelsListItem } from "./hotels-list-item"

const { Title } = Typography

const HotelsList: FC = () => {
	const navigate = useNavigate()
	const { data: hotels, isLoading, isFetching } = useGetHotelsQuery()

	return (
		<>
			<List<Hotel>
				rowKey={"id"}
				loading={isLoading || isFetching}
				header={
					<Flex justify={"space-between"}>
						<Title level={3}>Ваши отели</Title>
						<Button
							onClick={() =>
								navigate({
									to: "/hotels/register"
								})
							}
							icon={<PlusOutlined />}
							type={"primary"}
						>
							Добавить
						</Button>
					</Flex>
				}
				pagination={{
					pageSize: 5
				}}
				itemLayout={"horizontal"}
				dataSource={hotels?.data}
				renderItem={(hotel, index) => (
					<HotelsListItem data={hotel} key={index} />
				)}
			/>
		</>
	)
}

export { HotelsList }
