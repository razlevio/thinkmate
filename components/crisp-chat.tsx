"use client"

import { useEffect } from "react"
import { Crisp } from "crisp-sdk-web"

export function CrispChat() {
	useEffect(() => {
		Crisp.configure("3712c93d-2c73-4459-90fb-4b8e75ce421d")
	}, [])

	return null
}
