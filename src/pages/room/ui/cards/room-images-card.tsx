import { DeleteOutlined } from "@ant-design/icons"
import { useParams } from "@tanstack/react-router"
import {
	Button,
	Card,
	Col,
	Empty,
	Flex,
	Image,
	Popconfirm,
	Row,
	Space
} from "antd"
import { type FC } from "react"
import {
	useDeleteRoomsImageByIdMutation,
	useGetRoomsImagesByIdQuery
} from "src/services/rooms"
import { UploadButton } from "src/widgets/upload-button"

const RoomImagesCard: FC = () => {
	const { hotelSlug, roomId } = useParams({
		from: "/_layout/hotels/$hotelSlug/_hotel-layout/rooms/$roomId/"
	})

	const { data: roomImages, isLoading } = useGetRoomsImagesByIdQuery(
		hotelSlug,
		roomId
	)

	const { mutate: deleteImage } = useDeleteRoomsImageByIdMutation(hotelSlug)

	return (
		<>
			<Card
				loading={isLoading}
				title={"Фотографии номера"}
				extra={
					<UploadButton
						url={`/hotels/${hotelSlug}/rooms/${roomId}/images`}
						invalidate={{
							queryKey: ["rooms", hotelSlug, roomId, "images"]
						}}
					/>
				}
			>
				{roomImages?.data?.length ? (
					<Image.PreviewGroup>
						<Row wrap={true} gutter={8} style={{ rowGap: 8 }}>
							{roomImages?.data?.map((item, index) => (
								<Col key={index}>
									<Space direction={"vertical"}>
										<Image
											src={item?.image}
											fallback={"https://placehold.co/110x110"}
											height={110}
											style={{ borderRadius: 8, objectFit: "cover" }}
											width={110}
											alt={"Photo"}
										/>
										<Popconfirm
											okText={"Удалить"}
											okButtonProps={{ danger: true }}
											placement={"bottomRight"}
											title={"Удалить фото?"}
											onConfirm={() => deleteImage(item?.id)}
										>
											<Button
												icon={<DeleteOutlined />}
												type={"text"}
												block={true}
												danger={true}
											>
												Удалить
											</Button>
										</Popconfirm>
									</Space>
								</Col>
							))}
						</Row>
					</Image.PreviewGroup>
				) : (
					<Flex justify={"center"} align={"center"}>
						<Empty />
					</Flex>
				)}
			</Card>
		</>
	)
}

export { RoomImagesCard }
