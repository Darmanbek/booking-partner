import { useNavigate, useParams } from "@tanstack/react-router"
import { Button, Flex, Form, type FormProps } from "antd"
import { type FC, useEffect } from "react"
import {
	type RoomChange,
	useCreateRoomsMutation,
	useEditRoomsMutation,
	useGetRoomsByIdQuery
} from "src/services/rooms"
import { Loader } from "src/widgets/loader"
import { RoomsNewContext } from "../context"
import {
	RoomsNewAmenitiesForm,
	RoomsNewInfoForm,
	RoomsNewPricesForm
} from "./forms"

interface RoomsNewProps {
	isEdit?: boolean
}

const RoomsNew: FC<RoomsNewProps> = ({ isEdit }) => {
	const [form] = Form.useForm<RoomChange>()

	const { hotelSlug = "", roomId } = useParams({
		strict: false
	})
	const navigate = useNavigate()

	const { data: room, isLoading } = useGetRoomsByIdQuery(hotelSlug, roomId)

	const {
		mutate: addRoom,
		isPending: addLoading,
		isSuccess: addSuccess
	} = useCreateRoomsMutation(hotelSlug)

	const {
		mutate: editRoom,
		isPending: editLoading,
		isSuccess: editSuccess
	} = useEditRoomsMutation(hotelSlug)

	const onFinish: FormProps<RoomChange>["onFinish"] = (values) => {
		if (values.amenities) {
			values.amenities = values?.amenities?.filter(Boolean)
		}
		values["use_dinamic_price"] = !values["use_dinamic_price"]
		if (isEdit && roomId) {
			editRoom({
				...values,
				id: Number(roomId)
			})
			return
		}
		addRoom(values)
	}

	useEffect(() => {
		if (!isEdit) return
		if (room?.data) {
			form.setFieldsValue({
				...room?.data,
				room_type_id: room?.data?.room_type_id,
				amenities: undefined,
				use_dinamic_price: !room?.data?.use_dinamic_price
			})
		}
	}, [isEdit, room, form])

	useEffect(() => {
		if (addSuccess || editSuccess) {
			form.resetFields()
			navigate({
				to: "/hotels/$hotelSlug/rooms",
				params: {
					hotelSlug
				}
			})
		}
	}, [form, hotelSlug, addSuccess, editSuccess, navigate])

	return (
		<RoomsNewContext.Provider
			value={{
				form,
				onFinish
			}}
		>
			{isEdit && <Loader loading={isLoading} />}
			<RoomsNewInfoForm />
			<RoomsNewAmenitiesForm />
			<RoomsNewPricesForm />
			<Flex justify={"center"}>
				<Button
					loading={addLoading || editLoading}
					type={"primary"}
					size={"large"}
					onClick={form.submit}
				>
					{isEdit ? "Изменить номер" : "Создать номер"}
				</Button>
			</Flex>
		</RoomsNewContext.Provider>
	)
}

export { RoomsNew }
