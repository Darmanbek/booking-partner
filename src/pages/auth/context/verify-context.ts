import { createContext } from "react"

export type VerifyContextValues = {
	isVerify: boolean
	setIsVerify: (isVerify: boolean) => void
	phoneNumber: string
	setPhoneNumber: (phoneNumber: string) => void
	remember: boolean
	setRemember: (remember?: boolean) => void
}

export const VerifyContext = createContext<VerifyContextValues | null>(null)
