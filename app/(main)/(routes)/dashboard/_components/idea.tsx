"use client"

import { useState } from "react"
import { Idea as IdeaPrisma } from "@prisma/client"
import { ArrowDownCircle, ArrowUpCircle, Heart } from "lucide-react"
import { toast } from "sonner"

import { BackgroundGradient } from "@/components/ui/background-gradient"
import { Button } from "@/components/ui/button"

import { revalidate } from "../../../_actions/revalidate"

export function Idea(idea: IdeaPrisma) {
	const [isHearted, setIsHearted] = useState(true)
	const [isSaving, setIsSaving] = useState(false)
	const [isExpanded, setIsExpanded] = useState(false)
	const [ideaContext, setIdeaContext] = useState(idea.ideacontext)
	const [ideaContextLoading, setIdeaContextLoading] = useState(false)
	const [isIdeaContextFetched, setIsIdeaContextFetched] = useState(
		idea.ideacontext ? true : false
	)

	async function handleHeartClick() {
		setIsSaving(true)
		setIsHearted(!isHearted)

		if (isHearted) {
			const fetchPromise = fetch("/api/deleteidea", {
				method: "POST",
				body: JSON.stringify({ ideaId: idea.id }),
			})

			toast.promise(fetchPromise, {
				loading: "Deleting...",
				success: "Deleted!",
				error: "Error deleting",
			})

			fetchPromise.finally(() => {
				revalidate(`/`)
				setIsSaving(false)
			})
		}
	}

	async function handleExpandClick() {
		setIsExpanded(!isExpanded)

		// Early return conditions
		if (isExpanded) return // If collapsing the idea
		if (isIdeaContextFetched) return // If context has already been fetched

		setIdeaContextLoading(true)

		const response = await fetch("/api/ideacontext", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				title: idea.title,
				description: idea.description,
				userprompt: idea.userprompt,
			}),
		})

		if (response.body) {
			const reader = response.body.getReader()
			const decoder = new TextDecoder()
			let fetchedContext = ""

			const readStream = async () => {
				const { done, value } = await reader.read()
				if (done) {
					setIsIdeaContextFetched(true)
					setIdeaContextLoading(false)

					// Update the idea with the full fetched context

					setIsSaving(true)
					const fetchPromise = fetch(`/api/saveidea`, {
						method: "PATCH",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							ideaId: idea.id,
							ideacontext: fetchedContext,
						}),
					})

					toast.promise(fetchPromise, {
						loading: "Updating...",
						success: "Updated!",
						error: "Error updating",
					})

					fetchPromise.finally(() => {
						setIsSaving(false)
						revalidate(`/`)
					})
					return
				}

				// Decode streamed chunks and update UI incrementally
				const chunk = decoder.decode(value, { stream: true })
				fetchedContext += chunk
				setIdeaContext((prevContext) => prevContext + chunk)

				// Recursively read the next chunk
				readStream()
			}

			// Start reading from the stream
			readStream()
		}
	}

	return (
		<>
			{isHearted ? (
				<BackgroundGradient className="h-full rounded-[22px] bg-background p-6">
					<div className="flex flex-col gap-2 rounded-xl bg-background text-left">
						{/* Idea title and buttons */}
						<div className="flex items-center justify-between">
							<h3 className="text-xl font-black">{idea.title}</h3>
							<div className="flex">
								<Button
									onClick={handleHeartClick}
									disabled={isSaving || ideaContextLoading }
									size="icon"
									variant={"ghost"}
								>
									{isHearted ? <Heart fill="red" className="" /> : <Heart />}
								</Button>
								<Button
									onClick={handleExpandClick}
									disabled={isSaving || ideaContextLoading }
									size="icon"
									variant={"ghost"}
								>
									{isExpanded ? <ArrowUpCircle /> : <ArrowDownCircle />}
								</Button>
							</div>
						</div>

						{/* Idea description */}
						<p className="text-sm text-muted-foreground">{idea.description}</p>

						{/* Estended context functionality */}
						{isExpanded ? (
							<div className="prose">
								<ol className="list-decimal pl-6 text-base text-foreground">
									{ideaContext?.split("\n").map((item, index) => (
										<li key={index}>{item.replace(/^\d+\.\s*/, "")}</li>
									))}
								</ol>
							</div>
						) : null}
					</div>
				</BackgroundGradient>
			) : null}
		</>
	)
}
