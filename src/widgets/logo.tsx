import Image from "antd/es/image"
import Space, { type SpaceProps } from "antd/es/space"
import Title, { type TitleProps } from "antd/es/typography/Title"
import { type FC } from "react"

interface LogoProps extends SpaceProps {
	titleProps?: TitleProps
	collapsed?: boolean
}

const Logo: FC<LogoProps> = ({ titleProps, collapsed, ...props }) => {
	return (
		<Space {...props}>
			<Image
				src={"/react.svg"}
				fallback={"/public/react.svg"}
				width={32}
				height={32}
				alt={""}
				preview={false}
			/>
			{collapsed ? null : (
				<Title
					level={3}
					style={{
						whiteSpace: "nowrap",
						textOverflow: "ellipsis",
						overflow: "hidden"
					}}
					{...titleProps}
				>
					Booking
				</Title>
			)}
		</Space>
	)
}

export { Logo }
