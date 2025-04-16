import { type FC } from "react"
import { MatchLoading } from "src/widgets/match-loading"
import { HotelsList } from "./lists"

const Hotels: FC = () => {
	return (
		<>
			<MatchLoading to={"/hotels/$hotelSlug"} />
			<HotelsList />
		</>
	)
}

export { Hotels }
