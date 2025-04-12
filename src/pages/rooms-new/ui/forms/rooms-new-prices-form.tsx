import { Card, Form, InputNumber } from "antd"
import { type FC } from "react"
import { useRoomsNew } from "src/pages/rooms-new/hooks"
import type { RoomChange } from "src/services/rooms"
import { formatInputPrice } from "src/shared/utils"

const RoomsNewPricesForm: FC = () => {
	const { form, onFinish } = useRoomsNew()

	return (
		<>
			<Card title={"Стоимость за ночь"}>
				<Form
					name={"rooms-new-prices-form"}
					form={form}
					onFinish={onFinish}
					requiredMark={false}
					layout={"vertical"}
					autoComplete={"off"}
				>
					<Form.Item<RoomChange>
						name={"base_price"}
						label={"Базовая цена"}
						rules={[{ required: true }]}
					>
						<InputNumber
							style={{ width: "100%" }}
							formatter={formatInputPrice}
						/>
					</Form.Item>
				</Form>
			</Card>
		</>
	)
}

export { RoomsNewPricesForm }
