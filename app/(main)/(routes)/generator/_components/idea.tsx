"use client"

import { useState } from "react"
import { Aperture, Heart, ArrowDownCircle, ArrowUpCircle } from "lucide-react"
import { toast } from "sonner"

import { BackgroundGradient } from "@/components/ui/background-gradient"
import { Button } from "@/components/ui/button"

import { revalidate } from "../../../_actions/revalidate"

type IdeaProps = {
	title: string
	description: string
	userprompt: string
	isLoading: boolean
}

export function Idea({ title, description, userprompt, isLoading }: IdeaProps) {
	const [isHearted, setIsHearted] = useState(false)
	const [isSaving, setIsSaving] = useState(false)
	const [isExpanded, setIsExpanded] = useState(false)
	const [ideaContext, setIdeaContext] = useState("")
	const [isIdeaContextFetched, setIsIdeaContextFetched] = useState(false)

	async function handleHeartClick() {
		setIsSaving(true)
		setIsHearted(!isHearted)

		const fetchPromise = isHearted
			? fetch("/api/deleteidea", {
					method: "POST",
					body: JSON.stringify({ title, description, userprompt }),
				})
			: fetch("/api/saveidea", {
					method: "POST",
					body: JSON.stringify({ title, description, userprompt }),
				})

		toast.promise(fetchPromise, {
			loading: isHearted ? "Deleting..." : "Saving...",
			success: isHearted ? "Deleted!" : "Saved!",
			error: "Error" + (isHearted ? " deleting" : " saving"),
		})

		fetchPromise.finally(() => {
			revalidate(`/`)
			setIsSaving(false)
		})
	}

	async function handleExpandClick() {
		setIsExpanded(!isExpanded)
		if (isIdeaContextFetched) return
		if (!isExpanded) {
			const response = await fetch("/api/ideacontext", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ title, description, userprompt }),
			})
			if (response.body) {
				const reader = response.body.getReader()
				const decoder = new TextDecoder()

				while (true) {
					const { done, value } = await reader.read()
					if (done) {
						setIsIdeaContextFetched(true)
						break
					}
					const chunk = decoder.decode(value, { stream: true })
					// Process streamed chunk here - update state, UI, etc.
					setIdeaContext((prev) => prev + chunk)
				}
			}
		}
	}

	return (
		<BackgroundGradient className="h-full rounded-[22px] bg-background p-6">
			<div className="flex flex-col gap-2 rounded-xl bg-background text-left">

				{/* Idea title and buttons */}
				<div className="flex items-center justify-between">
					<h3 className="text-xl font-black">{title}</h3>
					<div>
						<Button
							onClick={handleHeartClick}
							disabled={isSaving}
							size="icon"
							variant={"ghost"}
							className="bg"
						>
							{isHearted ? <Heart fill="red" className="" /> : <Heart />}
						</Button>
						<Button
							onClick={handleExpandClick}
							disabled={isSaving}
							size="icon"
							variant={"ghost"}
							className="bg"
						>
							{isExpanded ? (
								<ArrowUpCircle />
							) : isLoading ? null : (
								<ArrowDownCircle />
							)}
						</Button>
					</div>
				</div>

				{/* Idea description */}
				<p className="text-sm text-muted-foreground">{description}</p>

				{/* Estended context functionality */}
				{isExpanded ? (
					<div className="prose">
						<ol className="list-decimal pl-6">
							{ideaContext.split("\n").map((item, index) => (
								<li key={index}>{item.replace(/^\d+\.\s*/, "")}</li>
							))}
						</ol>
					</div>
				) : null}
			</div>
		</BackgroundGradient>
	)
}
