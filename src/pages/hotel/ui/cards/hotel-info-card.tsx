import { useParams } from "@tanstack/react-router"
import { Alert, Card, Descriptions, Flex, Rate } from "antd"
import { type FC } from "react"
import { useHotelInfoItems } from "src/pages/hotel/hooks"
import { useGetHotelsBySlugQuery } from "src/services/hotels"
import { EditButton } from "src/widgets/edit-button"

const HotelInfoCard: FC = () => {
	const { hotelSlug } = useParams({
		from: "/_layout/hotels/$hotelSlug"
	})

	const { data: hotel, isLoading } = useGetHotelsBySlugQuery(hotelSlug)

	const items = useHotelInfoItems(hotel?.data)

	return (
		<>
			<Card
				loading={isLoading}
				title={"Общая информация"}
				extra={<EditButton params={hotel?.data} />}
			>
				<Flex vertical={true} gap={20}>
					<Descriptions layout={"vertical"} items={items} />
					<Alert
						type={"success"}
						message={"Количество звёзд"}
						description={
							<Rate value={Number(hotel?.data?.rating) || 0} disabled={true} />
						}
					/>
				</Flex>
			</Card>
		</>
	)
}

export { HotelInfoCard }
