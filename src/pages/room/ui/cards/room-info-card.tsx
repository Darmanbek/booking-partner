import { Card } from "antd"
import { type FC } from "react"

const RoomInfoCard: FC = () => {
	return (
		<Card
			// loading={isLoading}
			title={"Общая информация"}
			// extra={<EditButton params={hotel?.data} />}
		>
			<h1>RoomInfoCard</h1>
		</Card>
	)
}

export { RoomInfoCard }
