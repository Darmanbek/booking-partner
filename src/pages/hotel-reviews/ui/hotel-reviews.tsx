import { UserOutlined } from "@ant-design/icons"
import { useParams } from "@tanstack/react-router"
import { Card, Flex, List, Progress, Space } from "antd"
import Avatar from "antd/es/avatar"
import { type FC, useState } from "react"
import {
	type HotelReview,
	useGetHotelsBySlugQuery,
	useGetHotelsReviewsBySlugQuery
} from "src/services/hotels"
import { useTranslation } from "src/shared/hooks"
import { formatNumber } from "src/shared/utils"
import { RatingContainer } from "src/widgets/rating-container"
import { RatingTag } from "src/widgets/rating-tag"

const HotelReviews: FC = () => {
	const { hotelSlug } = useParams({
		from: "/_layout/hotels/$hotelSlug/_hotel-layout/(hotel-info)/_hotel-info-layout/reviews"
	})
	const { t } = useTranslation()
	const [params, setParams] = useState({
		page: 1,
		pageSize: 5
	})

	const {
		data: reviews,
		isLoading,
		isFetching
	} = useGetHotelsReviewsBySlugQuery(hotelSlug, {
		page: params.page,
		page_size: params.pageSize
	})

	const { data: hotel } = useGetHotelsBySlugQuery(hotelSlug)

	return (
		<RatingContainer
			placement={"start"}
			text={formatNumber(hotel?.data?.rating).toFixed(1)}
		>
			<Card styles={{ title: { paddingLeft: 24 } }} title={"Отзывы"}>
				<List<HotelReview>
					loading={isLoading || isFetching}
					itemLayout={"vertical"}
					size={"large"}
					rowKey={"id"}
					pagination={{
						onChange: (page, pageSize) => {
							setParams({ page, pageSize })
						},
						total: reviews?.pagination?.total,
						pageSize: params.pageSize,
						current: params.page
					}}
					dataSource={reviews?.data}
					renderItem={(item, index) => (
						<List.Item
							key={index}
							extra={
								<Flex vertical={true}>
									<Space size={2}>
										<RatingTag>
											{formatNumber(item?.rating).toFixed(1)}
										</RatingTag>
										{/*<Typography.Text style={{ fontWeight: 600 }}>*/}
										{/*	Очень хорошо*/}
										{/*</Typography.Text>*/}
									</Space>
									{item?.review_category_ratings?.map((value, index) => (
										<Flex key={index} vertical={true}>
											<Progress
												size={"small"}
												percent={formatNumber(value.rating) * 10}
												showInfo={false}
											/>
											<Flex
												gap={8}
												style={{ width: "100%", fontSize: 12 }}
												justify={"space-between"}
											>
												<span>{t(value?.review_category?.name)}</span>
												<span>{formatNumber(value.rating)}</span>
											</Flex>
										</Flex>
									))}
								</Flex>
							}
						>
							<List.Item.Meta
								avatar={<Avatar icon={<UserOutlined />} />}
								title={`${item?.user?.first_name} ${item?.user?.last_name}`}
								description={item?.created_at}
							/>
							{item?.comment}
						</List.Item>
					)}
				/>
			</Card>
		</RatingContainer>
	)
}

export { HotelReviews }
