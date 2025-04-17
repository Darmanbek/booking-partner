import type { ComponentProps, FC } from "react"
import { useToken } from "src/shared/hooks"

const Container: FC<ComponentProps<"div">> = ({ children, style, ...rest }) => {
	const { token } = useToken()
	return (
		<>
			<div
				style={{
					maxWidth: token.screenXXL,
					width: "100%",
					margin: "0 auto",
					height: "100%",
					padding: `0 ${token.paddingLG}px`,
					display: "flex",
					flexDirection: "column",
					gap: token.padding,
					...style
				}}
				{...rest}
			>
				{children}
			</div>
		</>
	)
}

export { Container }
