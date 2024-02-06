"use client"

import { useEffect, useState } from "react"
import { useChat } from "ai/react"
import { Zap } from "lucide-react"
import { Heading } from "@/app/(main)/_components/heading"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
export default function GeneratorPage() {
	// Static data for the generator section
	const generator = {
		title: "Generator",
		description: "Generate ideas across various domains.",
		icon: Zap,
		iconColor: "text-primary",
		bgColor: "bg-primary/10",
	}

	const [isLoading, setIsLoading] = useState(false)
	const [ideas, setIdeas] = useState([])
	const [userPrompt, setUserPrompt] = useState("")


	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setIsLoading(true)
		const response = await fetch("http://localhost:3000/api/ideas2", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ prompt: userPrompt }),
		})

		const { ideas } = await JSON.parse(await response.json())
		setIdeas(ideas)
		setIsLoading(false)
	}

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		setUserPrompt(e.target.value)
	}


	return (
		<div className="flex flex-col items-center justify-center px-6">
			<Heading {...generator} />
			<form onSubmit={handleSubmit} className="flex items-center justify-center gap-3">
				<Input onChange={handleInputChange} type="text" placeholder="Enter prompt" />
				<Button type="submit" size={"sm"}>Generate</Button>
			</form>
			{isLoading ? <Spinner size="md" /> : (
				<div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
					{ideas.map((idea) => (
						<div key={idea} className="rounded-lg bg-muted p-4 shadow">
							{idea}
						</div>
					))}
				</div>
			)}
		</div>
	)
}
