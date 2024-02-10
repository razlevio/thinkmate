"use client"

import { useState } from "react"
import { useAuth } from "@clerk/nextjs"
import { Heart } from "lucide-react"
import { toast } from "sonner"

import { BackgroundGradient } from "@/components/ui/background-gradient"
import { Button } from "@/components/ui/button"

import { revalidate } from "../../../_actions/revalidate"


type IdeaProps = {
	title: string
	description: string
	userprompt: string
}

export function Idea({ title, description, userprompt }: IdeaProps) {
	const [isHearted, setIsHearted] = useState(true)
	const [isSaving, setIsSaving] = useState(false)

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
	return (
		<>
			{isHearted ? (
				<BackgroundGradient className="h-full rounded-[22px] bg-background p-6">
					<div className="flex flex-col gap-2 rounded-xl bg-background text-left">
						<div className="flex items-center justify-between">
							<h3 className="text-xl font-black">{title}</h3>
							<Button
								onClick={handleHeartClick}
								disabled={isSaving}
								size="icon"
								variant={"ghost"}
								className="bg"
							>
								{isHearted ? <Heart fill="" /> : <Heart />}
							</Button>
						</div>
						<p className="text-sm text-muted-foreground">{description}</p>
					</div>
				</BackgroundGradient>
			) : null}
		</>
	)
}
