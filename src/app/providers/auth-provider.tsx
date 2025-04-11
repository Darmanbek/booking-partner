import { type FC, type PropsWithChildren, useState } from "react"
import { AuthContext, type AuthContextValues } from "src/shared/context"
import { tokenStorage } from "src/shared/utils"

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const [isAuth, setIsAuth] = useState(() => !!tokenStorage.getAccess())

	const login: AuthContextValues["login"] = (token, remember) => {
		tokenStorage.setAccess(token?.access_token, remember)
		if (token?.refresh_token) {
			tokenStorage.setRefresh(token?.refresh_token, remember)
		}
		setIsAuth(true)
	}

	const logout: AuthContextValues["logout"] = () => {
		tokenStorage.clear()
		setIsAuth(false)
	}

	return (
		<AuthContext.Provider
			value={{
				isAuth,
				login,
				logout
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export { AuthProvider }
