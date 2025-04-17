import { Content } from "antd/es/layout/layout"
import { type FC, type PropsWithChildren } from "react"
import { useToken } from "src/shared/hooks"

const MainContent: FC<PropsWithChildren> = ({ children }) => {
	const { token } = useToken()
	return (
		<Content
			style={{
				padding: `${token.paddingLG}px 0`,
				display: "flex",
				flexDirection: "column",
				gap: token.padding
			}}
		>
			{children}
		</Content>
	)
}

export { MainContent }
