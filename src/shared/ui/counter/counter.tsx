import { MinusOutlined, PlusOutlined } from "@ant-design/icons"
import {
	Button,
	ConfigProvider,
	InputNumber,
	type InputNumberProps,
	Space
} from "antd"
import { forwardRef } from "react"
import { useCounterStyles } from "./counter.style"

const Counter = forwardRef<HTMLInputElement, InputNumberProps>(
	({ className, value, onChange, min = 1, max, ...rest }, ref) => {
		const { styles, cx } = useCounterStyles()

		const handleDecrement = () => {
			if (typeof value !== "number") return
			const newValue = value - 1
			if (newValue >= Number(min)) {
				onChange?.(newValue)
			}
		}

		const handleIncrement = () => {
			if (typeof value !== "number") return
			const newValue = value + 1
			if (max === undefined || newValue <= Number(max)) {
				onChange?.(newValue)
			}
		}

		return (
			<ConfigProvider wave={{ disabled: true }}>
				<Space.Compact>
					<Button icon={<MinusOutlined />} onClick={handleDecrement} />
					<InputNumber
						controls={false}
						className={cx(styles.input, className)}
						ref={ref}
						value={value}
						onChange={onChange}
						min={min}
						max={max}
						{...rest}
					/>
					<Button icon={<PlusOutlined />} onClick={handleIncrement} />
				</Space.Compact>
			</ConfigProvider>
		)
	}
)
Counter.displayName = "Counter"

export { Counter }
