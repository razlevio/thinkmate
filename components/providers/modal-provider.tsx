"use client"

import { useEffect, useState } from "react"

import { ProModal } from "@/components/pro-modal"

export function ModalProvider() {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	if (!isMounted) return null

	return (
		<>
			<ProModal />
		</>
	)
}
