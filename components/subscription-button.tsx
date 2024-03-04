"use client"

import { useState } from "react"
import axios from "axios"
import { Rocket } from "lucide-react"

import { Button } from "@/components/ui/button"

type SubscriptionButtonProps = {
	isPro: boolean
}

export default function SubscriptionButton({ isPro }: SubscriptionButtonProps) {
	const [loading, setLoading] = useState(false)

	async function onClick() {
		try {
			setLoading(true)
			const respnse = await axios.get("/api/stripe")
			window.location.href = respnse.data.url
		} catch (error) {
			console.log("BILLING_ERROR", error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Button
			disabled={loading}
			variant={isPro ? "default" : "premium"}
			onClick={onClick}
		>
			{isPro ? "Manage Subscription" : "Upgrade to PRO"}
			{!isPro && <Rocket className="ml-2 size-4" />}
		</Button>
	)
}
