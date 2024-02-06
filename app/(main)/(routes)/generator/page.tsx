"use client"

import { useEffect, useState } from "react"
import { useChat } from "ai/react"
import { CornerDownLeft, Zap } from "lucide-react"
import Textarea from "react-textarea-autosize"
import TypewriterComponent from "typewriter-effect"

import { useEnterSubmit } from "@/hooks/use-enter-submit"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Heading } from "@/app/(main)/_components/heading"

export default function GeneratorPage() {
	const generator = {
		title: "Generator",
		description: "Generate ideas across various domains.",
		icon: Zap,
		iconColor: "text-primary",
		bgColor: "bg-primary/10",
	}

	const examplePrompts = [
		"List fusion dishes blending Italian and Japanese cuisines.",
		"Ideas to make comfort foods healthier.",
		"Unique ice cream flavor combinations.",
		"Themed at-home date night ideas.",
		"Outdoor date activities for nature lovers.",
		"Cultural date experiences in major cities.",
		"Future tech that could change art experiences.",
		"Sustainable urban living ideas.",
		"Innovations in accessible, engaging education.",
		"Philosophical questions unanswered by technology.",
		"Applying ancient philosophies to modern dilemmas.",
		"Finding meaning in a digital world.",
		"Community-impacting personal project ideas.",
		"Individual contributions to sustainability.",
		"Using digital media for a positive legacy.",
		"Unique DIY tech-craft projects.",
		"Fun, unconventional physical activities.",
		"Interactive storytelling experience ideas.",
		"Under-the-radar unique travel destinations.",
		"Skill-learning travel itineraries.",
		"Imagining future travel modes.",
		"Beyond-the-norm romantic gestures.",
		"Couple growth and learning ideas.",
		"Adventure and exploration in relationships.",
		"Virtual real-world exploration experiences.",
		"Unique scientific exploration places.",
		"Community-based local exploration projects.",
		"Emerging skills and hobbies due to tech.",
		"Creative boundary-pushing challenges.",
		"Accessible 'bucket list' experiences.",
	]

	const [isLoading, setIsLoading] = useState(false)
	const [ideas, setIdeas] = useState([])
	const [userPrompt, setUserPrompt] = useState("")
	const [isFocused, setIsFocused] = useState(false)
	const { formRef, onKeyDown } = useEnterSubmit()
	const [typeWriterStrings, setTypeWriterStrings] = useState(examplePrompts)

	function shuffleArray(array: string[]) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[array[i], array[j]] = [array[j], array[i]]
		}
		return array
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setIsLoading(true)
		const response = await fetch("http://localhost:3000/api/ideas", {
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

	function handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		setUserPrompt(e.target.value)
	}

	function handleFocus() {
		setIsFocused(true)
	}

	function handleBlur() {
		setTypeWriterStrings(shuffleArray(examplePrompts))
		setIsFocused(false)
	}

	return (
		<div className="flex flex-col items-center justify-center px-6">
			<Heading {...generator} />
			<div className="w-full max-w-6xl duration-300 ease-in-out animate-in">
				<form onSubmit={handleSubmit} ref={formRef}>
					<div className="relative flex items-center gap-4 rounded-md border px-6 md:px-12">
						<Textarea
							tabIndex={0}
							rows={1}
							disabled={isLoading}
							onKeyDown={onKeyDown}
							value={userPrompt}
							onChange={handleInputChange}
							onFocus={handleFocus}
							onBlur={handleBlur}
							spellCheck={false}
							className="max-h-[200px] w-full resize-none bg-transparent py-[1.3rem] focus-within:outline-none"
						/>
						{userPrompt === "" && !isFocused && (
							<div className="pointer-events-none absolute inset-x-6 inset-y-0 right-20 flex items-center justify-start bg-black bg-clip-text text-transparent dark:bg-white md:inset-x-12">
								<TypewriterComponent
									options={{
										strings: typeWriterStrings,
										delay: 20,
										deleteSpeed: 20,
										autoStart: true,
										loop: true,
										cursor: "|", // This enables the cursor
									}}
								/>
							</div>
						)}
						<div className="self-start py-[1.3rem]">
							<Button type="submit" size="icon" disabled={isLoading}>
								<CornerDownLeft />
								<span className="sr-only">Generate Button</span>
							</Button>
						</div>
					</div>
				</form>
			</div>
			{/* TODO: use idea component skeletons instead of spinner */}
			{isLoading ? (
				<div className="mt-12">
					<Spinner size="md" />
				</div>
			) : (
				<div className="mt-12 grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-3">
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
