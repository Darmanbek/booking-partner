import { ArrowLeftOutlined } from "@ant-design/icons"
import { useRouter } from "@tanstack/react-router"
import { Button, Card, Col, Form, InputNumber, Row, Select } from "antd"
import { type FC } from "react"
import { useRoomsNew } from "src/pages/rooms-new/hooks"
import { useGetRoomTypesQuery } from "src/services/room-types"
import type { RoomChange } from "src/services/rooms"
import { Counter } from "src/shared/ui"

const RoomsNewInfoForm: FC = () => {
	const router = useRouter()
	const { form, onFinish } = useRoomsNew()

	const { data: roomTypes, isLoading } = useGetRoomTypesQuery()

	return (
		<>
			<Card
				title={"Создание нового номера"}
				extra={
					<Button
						type={"primary"}
						icon={<ArrowLeftOutlined />}
						onClick={() => router.history.back()}
					>
						Назад
					</Button>
				}
			>
				<Form
					form={form}
					name={"rooms-new-info-form"}
					onFinish={onFinish}
					requiredMark={false}
					layout={"vertical"}
					autoComplete={"off"}
				>
					<Row gutter={16} style={{ rowGap: 16 }}>
						<Col xs={24} md={16}>
							<Form.Item<RoomChange> name={"room_type_id"} label={"Название"}>
								<Select
									loading={isLoading}
									disabled={isLoading}
									showSearch={true}
									optionFilterProp={"label"}
									options={roomTypes?.data?.map((item) => ({
										value: item?.id,
										label: item?.name
									}))}
								/>
							</Form.Item>
						</Col>
						<Col xs={24} md={8}>
							<Form.Item<RoomChange>
								name={"max_guests"}
								label={"Количество гостей"}
							>
								<Counter />
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16} style={{ rowGap: 16 }}>
						<Col xs={24} md={16}>
							<Form.Item<RoomChange>
								name={"room_area"}
								label={"Площадь номера (м²)"}
							>
								<InputNumber style={{ width: "100%" }} />
							</Form.Item>
						</Col>
						<Col xs={24} md={8}>
							<Form.Item<RoomChange>
								name={"quantity"}
								label={"Количество номеров"}
							>
								<Counter />
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Card>
		</>
	)
}

export { RoomsNewInfoForm }
