import { Empty, type EmptyProps, Flex, type FlexProps } from "antd"
import { type FC } from "react"

interface FlexEmptyProps extends Omit<FlexProps, "children"> {
	emptyProps?: EmptyProps
}

const FlexEmpty: FC<FlexEmptyProps> = ({ emptyProps, ...props }) => {
	return (
		<Flex
			justify={"center"}
			align={"center"}
			{...props}
			style={{ minHeight: 167, width: "100%", ...props?.style }}
		>
			<Empty {...emptyProps} />
		</Flex>
	)
}

export { FlexEmpty }
