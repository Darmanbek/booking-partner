import axios from "axios"
import { useState } from "react"
import { useDebounceEffect } from "src/shared/hooks"

const fetchAddress = async (
	lat: number,
	lon: number
): Promise<{
	display_name: string
}> => {
	const response = await axios.get(
		`https://nominatim.openstreetmap.org/reverse`,
		{
			params: {
				format: "jsonv2",
				lat,
				lon
			}
		}
	)
	return response.data
}

export const useReverseGeocode = (lat: number, lon: number, delay = 500) => {
	const [address, setAddress] = useState("")
	const [loading, setLoading] = useState(false)

	useDebounceEffect(() => {
		const fetchLocalAddress = async () => {
			try {
				setLoading(true)
				const data = await fetchAddress(lat, lon)
				setAddress(data?.display_name || "")
			} catch (err) {
				console.error("Ошибка геокодинга:", err)
			} finally {
				setLoading(false)
			}
		}

		fetchLocalAddress().then(() => setLoading(false))
	}, [lat, lon, delay])

	return { address, loading }
}
