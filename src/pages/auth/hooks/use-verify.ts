import { useContext } from "react"
import { VerifyContext } from "../context"

export const useVerify = () => {
	const verify = useContext(VerifyContext)

	if (!verify) {
		throw new Error("Verify Context is null")
	}

	return verify
}
