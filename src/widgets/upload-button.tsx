import { CloudDownloadOutlined } from "@ant-design/icons"
import {
	type InvalidateQueryFilters,
	useQueryClient
} from "@tanstack/react-query"
import { Button, Upload } from "antd"
import { type FC, useState } from "react"
import { BASE_URL } from "src/shared/config"
import { useMessage } from "src/shared/hooks"
import { tokenStorage } from "src/shared/utils"

interface UploadButtonProps {
	url: string
	invalidate?: InvalidateQueryFilters
}

const UploadButton: FC<UploadButtonProps> = ({ url, invalidate }) => {
	const { message } = useMessage()
	const [loading, setLoading] = useState(false)
	const queryClient = useQueryClient()

	return (
		<>
			<Upload
				showUploadList={false}
				name={"photo"}
				multiple={true}
				action={`${BASE_URL}/api/v1${url}`}
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
						if (invalidate) {
							queryClient.invalidateQueries(invalidate)
						}
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
		</>
	)
}

export { UploadButton }
