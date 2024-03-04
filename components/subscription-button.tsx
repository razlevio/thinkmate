"use client"

import { useState } from "react"
import axios from "axios"
import { Rocket } from "lucide-react"

import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Spinner } from "./ui/spinner"

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
			toast.error("Something went wrong")
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
			{loading && <div className="ml-2"><Spinner size="sm" /></div>}
		</Button>
	)
}
