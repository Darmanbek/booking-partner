import { useParams } from "@tanstack/react-router"
import { Dropdown } from "antd"
import Button from "antd/es/button"
import { type FC, memo, useMemo } from "react"
import {
	type Chessboard,
	useCreateChessboardMutation
} from "src/services/chessboard"
import type { Room } from "src/services/rooms"
import { formatNumber } from "src/shared/utils"

interface AvailabilityButtonProps {
	data: {
		room?: Room
		chessRoom?: Chessboard
		date: string
	}
}

const AvailabilityButton: FC<AvailabilityButtonProps> = ({
	data: { room, chessRoom, date }
}) => {
	const { hotelSlug } = useParams({
		from: "/_layout/hotels/$hotelSlug/_hotel-layout/availability"
	})
	const currentQuantity = useMemo(() => {
		if (chessRoom) {
			const item = chessRoom?.chessboard_items?.find(
				(el) => el.check_date === date
			)
			if (item?.available_rooms_count !== undefined) {
				return item?.available_rooms_count
			}
		}
		if (room?.quantity) {
			return room?.quantity
		}
		return 0
	}, [chessRoom, date, room?.quantity])

	const { mutate: addChessboard, isPending } =
		useCreateChessboardMutation(hotelSlug)

	const onSelectQuantity = (quantity: number) => {
		addChessboard({
			available_rooms_count: quantity,
			check_date: date,
			room_id: room?.id
		})
	}

	return (
		<>
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
		</>
	)
}

export default memo(AvailabilityButton)
