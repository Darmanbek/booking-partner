import {
	type FC,
	type PropsWithChildren,
	useCallback,
	useMemo,
	useState
} from "react"
import { AuthContext, type AuthContextValues } from "src/shared/context"
import { tokenStorage } from "src/shared/utils"

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const [isAuth, setIsAuth] = useState(() => !!tokenStorage.getAccess())

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
	return (
		<AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
	)
}

export { AuthProvider }
