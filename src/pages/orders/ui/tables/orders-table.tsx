import { SearchOutlined } from "@ant-design/icons"
import { Flex, Input, Select, Table } from "antd"
import { type FC } from "react"
import { type Order, ordersData } from "src/shared/data"
import { useOrdersTableColumns } from "./orders-table-columns"

const OrdersTable: FC = () => {
	const columns = useOrdersTableColumns()
	return (
		<>
			<Table<Order>
				rowKey={"id"}
				title={() => (
					<Flex gap={8}>
						<Input
							style={{ maxWidth: "25%" }}
							prefix={<SearchOutlined />}
							placeholder={"Поиск..."}
						/>
						<Select
							style={{ maxWidth: "20%", width: "100%" }}
							placeholder={"Сортировка"}
						/>
						{/*<Space>*/}
						{/*	<Button*/}
						{/*		disabled={true}*/}
						{/*		type={"primary"}*/}
						{/*		icon={<DownloadOutlined />}*/}
						{/*	>*/}
						{/*		Скачать*/}
						{/*	</Button>*/}
						{/*	<Button*/}
						{/*		disabled={true}*/}
						{/*		type={"primary"}*/}
						{/*		icon={<FilterOutlined />}*/}
						{/*	>*/}
						{/*		Фильтры*/}
						{/*	</Button>*/}
						{/*</Space>*/}
					</Flex>
				)}
				dataSource={ordersData}
				columns={columns}
			/>
		</>
	)
}

export { OrdersTable }
