"use client"

import { useEffect, useState } from "react"
import { Rocket } from "lucide-react"

import { MAX_FREE_COUNTS } from "@/lib/constants"

import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Progress } from "./ui/progress"

type FreeCounterProps = {
	apiLimitCount: number
}

export function FreeCounter({ apiLimitCount }: FreeCounterProps) {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	return (
		<div className="px-4">
			<Card>
				<CardContent className="py-6">
					<div className="mb-4 space-y-2 text-center text-sm text-foreground">
						<p>
							{apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
						</p>
						<Progress
							className="h-3"
							value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
						></Progress>
					</div>
					<Button className="w-full" variant={"premium"}>
						Upgrade
						<Rocket className="ml-2 size-4" />
					</Button>
				</CardContent>
			</Card>
		</div>
	)
}
