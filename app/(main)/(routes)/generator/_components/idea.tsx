"use client"

import { useState } from "react"
import { ArrowDownCircle, ArrowUpCircle, Heart } from "lucide-react"
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
	const [isSaved, setIsSaved] = useState(false)
	const [isExpanded, setIsExpanded] = useState(false)
	const [ideaContext, setIdeaContext] = useState("")
	const [ideaContextLoading, setIdeaContextLoading] = useState(false)
	const [isIdeaContextFetched, setIsIdeaContextFetched] = useState(false)
	const [ideaId, setIdeaId] = useState("")

	async function handleHeartClick() {
		setIsSaving(true)
		setIsHearted(!isHearted)

		if (isHearted) {
			const fetchPromise = fetch("/api/deleteidea", {
				method: "POST",
				body: JSON.stringify({ ideaId }),
			})

			toast.promise(fetchPromise, {
				loading: "Deleting...",
				success: "Deleted!",
				error: "Error deleting",
			})

			fetchPromise.finally(() => {
				revalidate(`/`)
				setIsSaving(false)
				setIdeaId
			})
			return
		} else {
			const fetchPromise = fetch("/api/saveidea", {
				method: "POST",
				body: JSON.stringify({
					title,
					description,
					userprompt,
					ideacontext: ideaContext,
				}),
			})

			toast.promise(fetchPromise, {
				loading: "Saving...",
				success: async (data) => {
					// Convert the Response object to JSON before parsing
					const response = await data.json()
					if (response.ideaId) {
						setIdeaId(response.ideaId)
						setIsSaved(true) // Update isIdeaSaved state if needed
					}
					return "Saved!"
				},
				error: "Error saving",
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
			body: JSON.stringify({ title, description, userprompt }),
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

					// If the idea is already saved, update it with the full fetched context
					if (isSaved) {
						setIsSaving(true)
						const fetchPromise = fetch(`/api/saveidea`, {
							method: "PATCH",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({
								ideaId,
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
					}

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

	// async function handleExpandClick() {
	// 	setIsExpanded(!isExpanded)
	// 	if (isIdeaContextFetched) return
	// 	if (!isExpanded) {
	// 		setIdeaContextLoading(true)
	// 		const response = await fetch("/api/ideacontext", {
	// 			method: "POST",
	// 			headers: { "Content-Type": "application/json" },
	// 			body: JSON.stringify({ title, description, userprompt }),
	// 		})
	// 		if (response.body) {
	// 			const reader = response.body.getReader()
	// 			const decoder = new TextDecoder()

	// 			while (true) {
	// 				const { done, value } = await reader.read()
	// 				if (done) {
	// 					setIsIdeaContextFetched(true)
	// 					setIdeaContextLoading(false)
	// 					break
	// 				}
	// 				const chunk = decoder.decode(value, { stream: true })
	// 				// Process streamed chunk here - update state, UI, etc.
	// 				setIdeaContext((prev) => prev + chunk)
	// 			}
	// 		}
	// 	}
	// }

	// async function handleExpandClick() {
	// 	setIsExpanded(!isExpanded)

	// 	// Early return if already expanded and context is fetched
	// 	if (isExpanded || isIdeaContextFetched) return

	// 	setIdeaContextLoading(true)
	// 	// Fetch the idea context
	// 	const response = await fetch("/api/ideacontext", {
	// 		method: "POST",
	// 		headers: { "Content-Type": "application/json" },
	// 		body: JSON.stringify({ title, description, userprompt }),
	// 	})

	// 	if (response.body) {
	// 		const reader = response.body.getReader()
	// 		const decoder = new TextDecoder()
	// 		let fetchedContext = ""

	// 		while (true) {
	// 			const { done, value } = await reader.read()
	// 			if (done) {
	// 				setIsIdeaContextFetched(true)
	// 				setIdeaContext(fetchedContext)
	// 				setIdeaContextLoading(false)

	// 				// Scenario 2: If the idea is already saved, update it with the fetched context
	// 				if (isIdeaSaved) {
	// 					setIsSaving(true)
	// 					const fetchPromise = fetch("/api/saveidea", {
	// 						method: "PATCH",
	// 						headers: { "Content-Type": "application/json" },
	// 						body: JSON.stringify({
	// 							ideaId,
	// 							ideacontext: fetchedContext,
	// 						}),
	// 					})

	// 					toast.promise(fetchPromise, {
	// 						loading: "Updating...",
	// 						success: "Updated!",
	// 						error: "Error updating",
	// 					})

	// 					fetchPromise.finally(() => {
	// 						revalidate(`/`)
	// 						setIsSaving(false)
	// 					})
	// 				}

	// 				break
	// 			}
	// 			const chunk = decoder.decode(value, { stream: true })
	// 			fetchedContext += chunk // Accumulate the chunks of fetched context
	// 		}
	// 	}
	// }

	return (
		<BackgroundGradient className="h-full rounded-[22px] bg-background p-6">
			<div className="flex flex-col gap-2 rounded-xl bg-background text-left">
				{/* Idea title and buttons */}
				<div className="flex items-center justify-between">
					<h3 className="text-xl font-black">{title}</h3>
					<div className="flex">
						<Button
							onClick={handleHeartClick}
							disabled={isSaving || ideaContextLoading || isLoading}
							size="icon"
							variant={"ghost"}
						>
							{isHearted ? <Heart fill="red" className="" /> : <Heart />}
						</Button>
						<Button
							onClick={handleExpandClick}
							disabled={isSaving || ideaContextLoading || isLoading}
							size="icon"
							variant={"ghost"}
						>
							{isExpanded ? <ArrowUpCircle /> : <ArrowDownCircle />}
						</Button>
					</div>
				</div>

				{/* Idea description */}
				<p className="text-sm text-muted-foreground">{description}</p>

				{/* Estended context functionality */}
				{isExpanded ? (
					<div className="prose">
						<ol className="list-decimal pl-6 text-base text-foreground">
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
