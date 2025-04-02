import { useResponsive } from "antd-style"
import { type FC, type PropsWithChildren } from "react"
import { useToken } from "src/shared/hooks"

const Container: FC<PropsWithChildren> = ({ children }) => {
	const { token } = useToken()
	const { xs, sm, md, lg, xl, xxl } = useResponsive()

	console.log({
		[token.screenXS]: xs,
		[token.screenSM]: sm,
		[token.screenMD]: md,
		[token.screenLG]: lg,
		[token.screenXL]: xl,
		[token.screenXXL]: xxl
	})
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
