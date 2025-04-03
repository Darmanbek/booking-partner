import { EditOutlined, EnvironmentOutlined } from "@ant-design/icons"
import { type FC } from "react"
import { Alert, Button, Card, Descriptions, Flex, Rate } from "src/shared/ui"

const HotelInfoCard: FC = () => {
	return (
		<>
			<Card
				title={"Общая информация"}
				extra={
					<Button type={"text"} icon={<EditOutlined />}>
						Редактировать
					</Button>
				}
			>
				<Flex vertical={true} gap={20}>
					<Descriptions
						layout={"vertical"}
						items={[
							{
								key: "name",
								label: "Название",
								children: "Hotel"
							},
							{
								key: "address",
								label: "Адрес",
								children: (
									<a
										href={"https://maps.google.com/?q=Ташкент, улица Чорсу, 31"}
										target={"_blank"}
									>
										<EnvironmentOutlined /> Ташкент, улица Чорсу, 31
									</a>
								)
							},
							{
								key: "type",
								label: "Тип объекта",
								children: "Отель"
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
