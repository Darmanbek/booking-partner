import { useNavigate, useParams } from "@tanstack/react-router"
import { Button, Flex, Form, type FormProps } from "antd"
import dayjs from "dayjs"
import { type FC, useEffect } from "react"
import { HotelsRegisterContext } from "src/pages/hotels-register/context"
import {
	type HotelChange,
	useCreateHotelsMutation,
	useEditHotelsMutation,
	useGetHotelsBySlugQuery
} from "src/services/hotels"
import {
	formatCustomDate,
	formatDate,
	formatFormPhone,
	formatFormReversePhone
} from "src/shared/utils"
import {
	HotelsAmenitiesForm,
	HotelsInfoForGuestForm,
	HotelsInfoForm
} from "./forms"

const HotelsRegister: FC = () => {
	const [form] = Form.useForm<HotelChange>()
	const { hotelSlug } = useParams({
		strict: false
	})
	const navigate = useNavigate()

	const { data: hotel } = useGetHotelsBySlugQuery(hotelSlug)

	const {
		mutate: addHotel,
		isPending: addLoading,
		isSuccess: addSuccess
	} = useCreateHotelsMutation()

	const {
		mutate: editHotel,
		isPending: editLoading,
		isSuccess: editSuccess
	} = useEditHotelsMutation()

	const onFinish: FormProps<HotelChange>["onFinish"] = (values) => {
		if (values.name) {
			values.name_ru = values.name
			values.name_en = values.name
			values.name_uz = values.name
			values.name_kk = values.name
		}
		if (values.description) {
			values.description_ru = values.description
			values.description_en = values.description
			values.description_uz = values.description
			values.description_kk = values.description
		}
		if (values.check_in) {
			values.check_in = formatCustomDate(values.check_in, "HH:mm")
		}
		if (values.check_out) {
			values.check_out = formatCustomDate(values.check_out, "HH:mm")
		}
		if (values.first_phone_for_guests) {
			values.first_phone_for_guests = formatFormPhone(
				values.first_phone_for_guests
			)
		}
		if (values.second_phone_for_guests) {
			values.second_phone_for_guests = formatFormPhone(
				values.second_phone_for_guests
			)
		}
		if (values.amenities) {
			values.amenities = values.amenities.filter(Boolean)
		}
		if (hotelSlug) {
			editHotel({
				...values,
				slug: hotelSlug
			})
			return
		}
		addHotel(values)
	}

	useEffect(() => {
		if (!hotelSlug) return
		if (hotel?.data) {
			form.setFieldsValue({
				...hotel?.data,
				name_ru: hotel?.data?.name?.ru,
				name_en: hotel?.data?.name?.en,
				name_uz: hotel?.data?.name?.uz,
				name_kk: hotel?.data?.name?.kk,
				name: hotel?.data?.name?.ru,
				description_ru: hotel?.data?.description?.ru,
				description_en: hotel?.data?.description?.en,
				description_uz: hotel?.data?.description?.uz,
				description_kk: hotel?.data?.description?.kk,
				description: hotel?.data?.description?.ru,
				city_id: hotel?.data?.location?.city_id,
				hotel_category_id: hotel?.data?.category_id,
				first_phone_for_guests: formatFormReversePhone(
					hotel?.data?.hotel_info?.first_phone_number
				),
				second_phone_for_guests: formatFormReversePhone(
					hotel?.data?.hotel_info?.second_phone_number
				),
				email_for_guests: hotel?.data?.hotel_info?.email,
				site_url: hotel?.data?.hotel_info?.site_url,
				check_in: hotel?.data?.hotel_rules?.check_in_from
					? dayjs(
							`${formatDate(hotel?.data?.created_at)} ${hotel?.data?.hotel_rules?.check_in_from}`
						)
					: undefined,
				check_out: hotel?.data?.hotel_rules?.check_out_from
					? dayjs(
							`${formatDate(hotel?.data?.created_at)} ${hotel?.data?.hotel_rules?.check_out_from}`
						)
					: undefined,
				address: hotel?.data?.location?.address
			})
		}
	}, [form, hotel?.data, hotelSlug])

	useEffect(() => {
		if (addSuccess || editSuccess) {
			navigate({
				to: "/hotels",
				replace: true
			})
		}
	}, [addSuccess, editSuccess, navigate])
	return (
		<HotelsRegisterContext.Provider
			value={{
				form,
				onFinish
			}}
		>
			<HotelsInfoForm />
			<HotelsAmenitiesForm />
			<HotelsInfoForGuestForm />
			<Flex justify={"center"}>
				<Button
					loading={addLoading || editLoading}
					disabled={addLoading || editLoading}
					onClick={form.submit}
					type={"primary"}
					size={"large"}
				>
					{hotelSlug ? "Изменить" : "Зарегистрировать"}
				</Button>
			</Flex>
		</HotelsRegisterContext.Provider>
	)
}

export { HotelsRegister }
