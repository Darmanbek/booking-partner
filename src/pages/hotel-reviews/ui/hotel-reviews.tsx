import { Card, Divider, Flex, List, Progress, Space, Typography } from "antd"
import Avatar from "antd/es/avatar"
import { type FC } from "react"
import { RatingTag } from "src/widgets/rating-tag"

const data = Array.from({ length: 23 }).map((_, i) => ({
	title: `User ${i + 1}`,
	avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
	description: (
		<Space
			direction={"vertical"}
			split={<Divider style={{ marginBlock: 0 }} />}
		>
			<Space split={<Divider type={"vertical"} />}>
				<>отдых, в одиночку</>
				<>февраль 2024 г.</>
			</Space>
			<>
				Двухместный номер Standard с видом на город (двуспальная кровать)
				(кровать king size), 4 ночи
			</>
		</Space>
	),
	content:
		"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aperiam aspernatur autem blanditiis corporis debitis delectus, deserunt dicta dolor dolore dolorem dolores ducimus enim error eveniet ex laboriosam nihil odit possimus repellat? Accusantium consequuntur dolorem eius minus odit perspiciatis quam."
}))

const HotelReviews: FC = () => {
	return (
		<>
			<Card title={"Отзывы"}>
				<List
					itemLayout={"vertical"}
					size={"large"}
					pagination={{
						onChange: (page) => {
							console.log(page)
						},
						pageSize: 3
					}}
					dataSource={data}
					renderItem={(item) => (
						<List.Item
							key={item.title}
							extra={
								<Flex vertical={true}>
									<Space size={2}>
										<RatingTag>7.5</RatingTag>
										<Typography.Text style={{ fontWeight: 600 }}>
											Очень хорошо
										</Typography.Text>
									</Space>
									{[85, 64, 84, 38].map((value, index) => (
										<Flex key={index} vertical={true}>
											<Progress
												size={"small"}
												percent={value}
												showInfo={false}
											/>
											<Flex
												gap={8}
												style={{ width: "100%", fontSize: 12 }}
												justify={"space-between"}
											>
												<span>Название</span>
												<span>{(value || 0) / 10}</span>
											</Flex>
										</Flex>
									))}
								</Flex>
							}
						>
							<List.Item.Meta
								avatar={<Avatar src={item.avatar} />}
								title={item.title}
								description={item.description}
							/>
							{item.content}
						</List.Item>
					)}
				/>
			</Card>
		</>
	)
}

export { HotelReviews }
