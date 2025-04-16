import { EnvironmentOutlined } from "@ant-design/icons"
import { Alert, Card, Descriptions, Flex, Rate } from "antd"
import { type FC } from "react"
import { useGetHotelsQuery } from "src/services/hotels"
import { useTranslation } from "src/shared/hooks"
import { EditButton } from "src/widgets/edit-button"

const HotelInfoCard: FC = () => {
	const { t } = useTranslation()

	const { data: hotel, isLoading } = useGetHotelsQuery()
	console.log(hotel)
	return (
		<>
			<Card
				loading={isLoading}
				title={"Общая информация"}
				extra={<EditButton params={{}} />}
			>
				<Flex vertical={true} gap={20}>
					<Descriptions
						layout={"vertical"}
						items={[
							{
								key: "name",
								label: "Название",
								children: t(hotel?.data?.name)
							},
							{
								key: "address",
								label: "Адрес",
								children: (
									<a
										href={`https://maps.google.com/?q=${hotel?.data?.location?.coordinates?.latitude} ${hotel?.data?.location?.coordinates?.longitude}`}
										target={"_blank"}
									>
										<EnvironmentOutlined /> {hotel?.data?.location?.city},{" "}
										{hotel?.data?.location?.address}
									</a>
								)
							},
							{
								key: "type",
								label: "Тип объекта",
								children: t(hotel?.data?.category)
							},
							{
								key: "count",
								label: "Количество номеров",
								children: "27"
							},
							{
								key: "date_in",
								label: "Заезд",
								children: "14:00"
							},
							{
								key: "date_out",
								label: "Выезд",
								children: "16:00"
							}
						]}
					/>
					<Alert
						type={"success"}
						message={"Количество звёзд"}
						description={<Rate value={5} disabled={true} />}
					/>
				</Flex>
			</Card>
		</>
	)
}

export { HotelInfoCard }
