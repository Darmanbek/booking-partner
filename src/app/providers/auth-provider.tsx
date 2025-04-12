import {
	type FC,
	type PropsWithChildren,
	useCallback,
	useMemo,
	useState
} from "react"
import {
	AuthContext,
	type AuthContextValues,
	HotelContext
} from "src/shared/context"
import { tokenStorage } from "src/shared/utils"

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const [isAuth, setIsAuth] = useState(() => !!tokenStorage.getAccess())
	const [hotelSlug, setHotelSlug] = useState<string | null>(null)
	const [hasHotel, setHasHotel] = useState<boolean>(false)

	const login: AuthContextValues["login"] = useCallback((token, remember) => {
		tokenStorage.setAccess(token?.access_token, remember)
		if (token?.refresh_token) {
			tokenStorage.setRefresh(token?.refresh_token, remember)
		}
		setIsAuth(true)
	}, [])

	const logout: AuthContextValues["logout"] = useCallback(() => {
		tokenStorage.clear()
		setIsAuth(false)
	}, [])

	const authValues = useMemo(
		() => ({
			isAuth,
			login,
			logout
		}),
		[isAuth, login, logout]
	)

	const hotelValues = useMemo(
		() => ({
			hotelSlug,
			setHotelSlug,
			hasHotel,
			setHasHotel
		}),
		[hasHotel, hotelSlug]
	)

	return (
		<AuthContext.Provider value={authValues}>
			<HotelContext.Provider value={hotelValues}>
				{children}
			</HotelContext.Provider>
		</AuthContext.Provider>
	)
}

export { AuthProvider }
