import { useResponsive } from "antd-style"
import Image from "antd/es/image"
import Space, { type SpaceProps } from "antd/es/space"
import Title, { type TitleProps } from "antd/es/typography/Title"
import { type FC } from "react"

interface LogoProps extends SpaceProps {
	titleProps?: TitleProps
	collapsed?: boolean
}

const Logo: FC<LogoProps> = ({ titleProps, collapsed, ...props }) => {
	const { sm } = useResponsive()

	return (
		<Space {...props}>
			<Image
				src={"/react-blue.svg"}
				fallback={"/public/react-blue.svg"}
				width={32}
				height={32}
				alt={""}
				preview={false}
			/>
			{collapsed ? null : (
				<Title
					level={sm ? 3 : 4}
					style={{
						whiteSpace: "nowrap",
						textOverflow: "ellipsis",
						overflow: "hidden",
						lineHeight: 1.3
					}}
					{...titleProps}
				>
					NBooking.uz
				</Title>
			)}
		</Space>
	)
}

export { Logo }
