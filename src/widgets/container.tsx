import { type FC, type PropsWithChildren } from "react"
import { useToken } from "src/shared/hooks"

const Container: FC<PropsWithChildren> = ({ children }) => {
	const { token } = useToken()

	return (
		<div
			style={{
				maxWidth: token.screenXL,
				margin: "0 auto"
			}}
		>
			{children}
		</div>
	)
}

export { Container }
