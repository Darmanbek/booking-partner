import { useNavigate, useParams } from "@tanstack/react-router"
import { Button, Flex, Form, type FormProps } from "antd"
import { type FC, useEffect } from "react"
import { type RoomChange, useCreateRoomsMutation } from "src/services/rooms"
import { RoomsNewContext } from "../context"
import {
	RoomsNewAmenitiesForm,
	RoomsNewInfoForm,
	RoomsNewPricesForm
} from "./forms"

const RoomsNew: FC = () => {
	const [form] = Form.useForm<RoomChange>()
	const { hotelSlug } = useParams({
		from: "/_layout/hotels/$hotelSlug/_hotel-layout/rooms/new"
	})
	const navigate = useNavigate()

	const {
		mutate: addRoom,
		isPending: addLoading,
		isSuccess
	} = useCreateRoomsMutation(hotelSlug)

	const onFinish: FormProps<RoomChange>["onFinish"] = (values) => {
		if (values.amenities) {
			values.amenities = values?.amenities?.filter(Boolean)
		}
		addRoom(values)
	}

	useEffect(() => {
		if (isSuccess) {
			form.resetFields()
			navigate({
				to: "/hotels/$hotelSlug/rooms",
				params: {
					hotelSlug
				}
			})
		}
	}, [form, hotelSlug, isSuccess, navigate])
	return (
		<RoomsNewContext.Provider
			value={{
				form,
				onFinish
			}}
		>
			<RoomsNewInfoForm />
			<RoomsNewAmenitiesForm />
			<RoomsNewPricesForm />
			<Flex justify={"center"}>
				<Button
					loading={addLoading}
					type={"primary"}
					size={"large"}
					onClick={form.submit}
				>
					Создать номер
				</Button>
			</Flex>
		</RoomsNewContext.Provider>
	)
}

export { RoomsNew }
