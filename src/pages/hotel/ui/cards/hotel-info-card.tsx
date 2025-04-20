import { useParams } from "@tanstack/react-router"
import { Alert, Card, Descriptions, Flex, Typography } from "antd"
import { type FC } from "react"
import { useHotelInfoItems } from "src/pages/hotel/hooks"
import { useGetHotelsBySlugQuery } from "src/services/hotels"
import { formatNumber } from "src/shared/utils"
import { EditButton } from "src/widgets/edit-button"
import { RatingTag } from "src/widgets/rating-tag"

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
						description={
							<Flex align={"center"}>
								<RatingTag>
									{formatNumber(hotel?.data?.rating)?.toFixed(1)}
								</RatingTag>
								<Typography.Title level={4}>Рейтинг</Typography.Title>
							</Flex>
						}
					/>
				</Flex>
			</Card>
		</>
	)
}

export { HotelInfoCard }
