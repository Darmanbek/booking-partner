import { Tabs } from "antd"
import { type FC } from "react"
import { AvailabilityTable, PricesTable } from "./tables"

const AvailabilityPrices: FC = () => {
	return (
		<>
			<Tabs
				type={"card"}
				items={[
					{
						key: "availability",
						label: "Доступность",
						children: <AvailabilityTable />
					},
					{
						key: "prices",
						label: "Цена, UZS",
						children: <PricesTable />
					}
				]}
			/>
		</>
	)
}

export { AvailabilityPrices }
