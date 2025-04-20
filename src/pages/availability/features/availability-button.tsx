import { useParams } from "@tanstack/react-router"
import { Divider, Dropdown, Space, Tag } from "antd"
import Button from "antd/es/button"
import { type FC, memo, useMemo } from "react"
import {
	type Chessboard,
	type ChessboardActiveBooking,
	useCreateChessboardMutation
} from "src/services/chessboard"
import type { Room } from "src/services/rooms"
import { formatNumber } from "src/shared/utils"

interface AvailabilityButtonProps {
	data: {
		room?: Room
		date: string
		chessboard?: Chessboard
		active_booking?: ChessboardActiveBooking
	}
}

const AvailabilityButton: FC<AvailabilityButtonProps> = ({
	data: { room, date, chessboard, active_booking }
}) => {
	const { hotelSlug } = useParams({
		from: "/_layout/hotels/$hotelSlug/_hotel-layout/availability"
	})

	const chessRoomQuantity = useMemo(() => {
		if (!chessboard) return
		const item = chessboard?.chessboard_items?.find(
			(el) => el.check_date === date
		)
		return item?.available_rooms_count
	}, [chessboard, date])

	const currentQuantity = useMemo(() => {
		if (chessRoomQuantity !== undefined) {
			return chessRoomQuantity
		}
		if (room?.quantity) {
			return room?.quantity
		}
		return 0
	}, [chessRoomQuantity, room?.quantity])

	const { mutate: addChessboard, isPending } =
		useCreateChessboardMutation(hotelSlug)

	const onSelectQuantity = (quantity: number) => {
		addChessboard({
			available_rooms_count: quantity,
			check_date: date,
			room_id: room?.id
		})
	}

	const activeBookingCount = useMemo(
		() =>
			active_booking?.active_bookings?.find((el) => el.check_in_date === date)
				?.count || 0,
		[active_booking?.active_bookings, date]
	)

	return (
		<>
			<Space
				direction={"vertical"}
				split={<Divider style={{ margin: 0 }} type={"horizontal"} />}
			>
				<Dropdown
					trigger={["click"]}
					menu={{
						style: {
							height: 200,
							width: 60,
							scrollbarWidth: "thin"
						},
						selectable: true,
						onSelect: (item) => onSelectQuantity(Number(item?.key)),
						selectedKeys: [`${currentQuantity}`],
						items: Array.from({
							length: formatNumber(room?.quantity) + 1
						})?.map((_v, index) => ({
							key: `${index}`,
							label: index
						}))
					}}
				>
					<Button
						variant={"solid"}
						style={{ aspectRatio: 1, width: 40, height: 40 }}
						color={currentQuantity == 0 ? "red" : "green"}
						loading={isPending}
						icon={`${currentQuantity}`}
					/>
				</Dropdown>
				<Tag
					color={activeBookingCount > 0 ? "green-inverse" : "blue"}
					style={{
						margin: "0 auto",
						fontSize: 14,
						aspectRatio: 1
					}}
				>
					{activeBookingCount}
				</Tag>
			</Space>
		</>
	)
}

export default memo(AvailabilityButton)
