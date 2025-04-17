import { Link, useParams } from "@tanstack/react-router"
import { Card, Descriptions } from "antd"
import { type FC } from "react"
import { useGetRoomsByIdQuery } from "src/services/rooms"
import { formatNumber, formatPriceWithCurrency } from "src/shared/utils"
import { EditButton } from "src/widgets/edit-button"

const RoomInfoCard: FC = () => {
	const { hotelSlug, roomId } = useParams({
		from: "/_layout/hotels/$hotelSlug/_hotel-layout/rooms/$roomId/"
	})

	const { data: room, isLoading } = useGetRoomsByIdQuery(hotelSlug, roomId)

	return (
		<Card
			loading={isLoading}
			title={"Общая информация"}
			extra={
				<Link
					to={"/hotels/$hotelSlug/rooms/$roomId/edit"}
					params={{
						hotelSlug,
						roomId
					}}
				>
					<EditButton disableFrom={true} />
				</Link>
			}
		>
			<Descriptions
				layout={"vertical"}
				items={[
					{
						key: "room_type",
						label: "Тип номера",
						children: room?.data?.room_type
					},
					{
						key: "quantity",
						label: "Количество",
						children: formatNumber(room?.data?.quantity)
					},
					{
						key: "base_price",
						label: "Начальная цена",
						children: formatPriceWithCurrency(room?.data?.base_price)
					},
					{
						key: "room_area",
						label: "Площадь номера",
						children: `${formatNumber(room?.data?.room_area)} М²`
					},
					{
						key: "max_guests",
						label: "Максимум гостей",
						children: formatNumber(room?.data?.max_guests)
					}
				]}
			/>
		</Card>
	)
}

export { RoomInfoCard }
