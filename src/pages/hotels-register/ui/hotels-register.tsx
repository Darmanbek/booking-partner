import { useNavigate } from "@tanstack/react-router"
import { Button, Flex, Form, type FormProps } from "antd"
import { type FC, useEffect } from "react"
import { HotelsRegisterContext } from "src/pages/hotels-register/context"
import { type HotelChange, useCreateHotelsMutation } from "src/services/hotels"
import { formatCustomDate, formatFormPhone } from "src/shared/utils"
import {
	HotelsAmenitiesForm,
	HotelsInfoForGuestForm,
	HotelsInfoForm
} from "./forms"

const HotelsRegister: FC = () => {
	const [form] = Form.useForm<HotelChange>()
	const navigate = useNavigate()

	const {
		mutate: hotelRegister,
		isPending,
		isSuccess
	} = useCreateHotelsMutation()

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
		hotelRegister(values)
	}

	useEffect(() => {
		if (isSuccess) {
			navigate({
				to: "/hotel",
				replace: true
			})
		}
	})
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
					loading={isPending}
					disabled={isPending}
					onClick={form.submit}
					type={"primary"}
					size={"large"}
				>
					Зарегистрировать
				</Button>
			</Flex>
		</HotelsRegisterContext.Provider>
	)
}

export { HotelsRegister }
