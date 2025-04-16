import { CloudDownloadOutlined, DeleteOutlined } from "@ant-design/icons"
import { useQueryClient } from "@tanstack/react-query"
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
	Space,
	Upload
} from "antd"
import { type FC, useState } from "react"
import {
	useDeleteHotelsImageBySlugMutation,
	useGetHotelsImagesBySlugQuery
} from "src/services/hotels"
import { BASE_URL } from "src/shared/config"
import { useMessage } from "src/shared/hooks"
import { tokenStorage } from "src/shared/utils"

const HotelImagesCard: FC = () => {
	const { hotelSlug } = useParams({
		from: "/_layout/hotels/$hotelSlug"
	})
	const { message } = useMessage()
	const queryClient = useQueryClient()
	const [loading, setLoading] = useState(false)

	const { data: hotelImages, isLoading } =
		useGetHotelsImagesBySlugQuery(hotelSlug)

	const { mutate: deleteImage } = useDeleteHotelsImageBySlugMutation(hotelSlug)

	return (
		<>
			<Card
				loading={isLoading}
				title={"Фотографии отеля"}
				extra={
					<Upload
						showUploadList={false}
						name={"photo"}
						multiple={true}
						action={`${BASE_URL}/api/v1/hotels/${hotelSlug}/images`}
						headers={{
							Authorization: `Bearer ${tokenStorage.getAccess()}`
						}}
						onChange={(info) => {
							setLoading(true)
							if (info.file.status !== "uploading") {
								console.log(info.file, info.fileList)
							}
							if (info.file.status === "done") {
								message.success({
									message: "Успешно",
									description: `Файл ${info.file.name} успешно загружен`
								})
								queryClient.invalidateQueries({
									queryKey: ["hotels", hotelSlug]
								})
								setLoading(false)
							} else if (info.file.status === "error") {
								message.error({
									message: "Ошибка",
									description: `Загрузка файла ${info.file.name} не удалась.`
								})
								setLoading(false)
							}
						}}
						accept={"image/*"}
					>
						<Button
							loading={loading}
							icon={<CloudDownloadOutlined />}
							type={"primary"}
						>
							Загрузить
						</Button>
					</Upload>
				}
			>
				{hotelImages?.data?.length ? (
					<Image.PreviewGroup>
						<Row wrap={true} gutter={8} style={{ rowGap: 8 }}>
							{hotelImages?.data?.map((item, index) => (
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

export { HotelImagesCard }
