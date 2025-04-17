import { EnvironmentOutlined } from "@ant-design/icons"
import type { DescriptionsProps } from "antd"
import type { Hotel } from "src/services/hotels"
import { useTranslation } from "src/shared/hooks"
import { formatNumber } from "src/shared/utils"

export const useHotelInfoItems = (data?: Hotel) => {
	const { t } = useTranslation()

	const items: DescriptionsProps["items"] = [
		{
			key: "name",
			label: "Название",
			children: t(data?.name)
		},
		{
			key: "address",
			label: "Адрес",
			children: (
				<a
					href={`https://maps.google.com/?q=${data?.location?.coordinates?.latitude} ${data?.location?.coordinates?.longitude}`}
					target={"_blank"}
				>
					<EnvironmentOutlined /> {data?.location?.city},{" "}
					{data?.location?.address}
				</a>
			)
		},
		{
			key: "type",
			label: "Тип объекта",
			children: t(data?.category)
		},
		{
			key: "count",
			label: "Количество номеров",
			children: formatNumber(data?.rooms_count)
		},
		{
			key: "date_in",
			label: "Заезд",
			children: data?.hotel_rules?.check_in_from
		},
		{
			key: "date_out",
			label: "Выезд",
			children: data?.hotel_rules?.check_out_from
		}
	]

	return items
}
