"use client"

import { useState } from "react"
import { DialogTitle } from "@radix-ui/react-dialog"
import axios from "axios"
import { Check, Database, Rocket, Save, SwatchBook, Zap } from "lucide-react"

import { useProModal } from "@/hooks/use-pro-modal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
} from "@/components/ui/dialog"
import { toast } from "sonner"

export function ProModal() {
	const [loading, setLoading] = useState(false)
	const proModal = useProModal()
	const COPY = [
		{ point: "Generate ideas on demand, as often as you like", icon: Zap },
		{ point: "Save all your favorite ideas", icon: Save },
		{ point: "Get ideas that perfectly suit your needs", icon: SwatchBook },
		{ point: "Create a personal idea library", icon: Database },
	]

	const onSubscribe = async () => {
		try {
			setLoading(true)
			const response = await axios.get("/api/stripe")
			window.location.href = response.data.url
		} catch (error) {
			toast.error("Something went wrong")
			console.log(error, "STRIPE_CLIENT_ERROR")
		} finally {
			setLoading(false)
		}
	}

	return (
		<div>
			<Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle className="flex flex-col items-center justify-center gap-y-4 pb-2">
							<div className="flex items-center justify-center gap-x-2 py-1 font-bold">
								<h1 className="text-lg">Upgrade to Thinkmate</h1>
								<Badge variant={"premium"} className="py-1 text-sm uppercase">
									Pro
								</Badge>
							</div>
						</DialogTitle>
						<DialogDescription className="space-y-2 pt-2 font-medium text-muted-foreground">
							Get unlimited idea generation, save all your favorites, and tailor
							results even further for truly personalized inspiration
						</DialogDescription>
					</DialogHeader>
					{COPY.map((copy, index) => (
						<Card key={index} className="flex items-center justify-between p-3">
							<div className="flex items-center justify-center gap-3">
								<copy.icon />
								<p className="text-sm font-semibold">{copy.point}</p>
							</div>
							<Check className="text-primary" />
						</Card>
					))}
					<DialogFooter>
						<Button
							disabled={loading}
							onClick={onSubscribe}
							variant={"premium"}
							size="lg"
							className="w-full"
						>
							Upgrade <Rocket className="ml-2 size-4" />
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	)
}
