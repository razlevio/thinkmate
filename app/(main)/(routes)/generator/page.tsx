"use client"

import { useEffect, useRef, useState } from "react"
import { useChat } from "ai/react"
import { CornerDownLeft, Zap } from "lucide-react"
import Textarea from "react-textarea-autosize"
import TypewriterComponent from "typewriter-effect"

import { cn } from "@/lib/utils"
import { useEnterSubmit } from "@/hooks/use-enter-submit"
import { Button } from "@/components/ui/button"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import { Heading } from "@/app/(main)/_components/heading"

export default function GeneratorPage() {
	// Static data for the generator section
	const generator = {
		title: "Generator",
		description: "Generate ideas across various domains.",
		icon: Zap,
		iconColor: "text-primary",
		bgColor: "bg-primary/10",
	}

	// Example prompts for the typewriter effect
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

	// Hook to manage chat functionality
	const { messages, input, handleInputChange, handleSubmit, isLoading } =
		useChat({ api: "/api/chat" })

	// State and ref declarations
	const status = isLoading ? "loading" : "awaiting_message"
	const inputRef = useRef<HTMLTextAreaElement>(null)
	const { formRef, onKeyDown } = useEnterSubmit()
	const [isFocused, setIsFocused] = useState(false)
	const [typeWriterStrings, setTypeWriterStrings] = useState(examplePrompts)
	const [userPrompt, setUserPrompt] = useState(input)

	// Effect to shuffle typewriter strings on component mount
	useEffect(() => {
		const strings = shuffleArray(examplePrompts)
		setTypeWriterStrings(strings)
	}, [])

	// Handlers for input focus and blur events
	function handleFocus() {
		setIsFocused(true)
	}

	function handleBlur() {
		setTypeWriterStrings(shuffleArray(examplePrompts))
		setIsFocused(false)
	}

	// Function to shuffle an array (Fisher-Yates shuffle algorithm)
	function shuffleArray(array: string[]) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[array[i], array[j]] = [array[j], array[i]]
		}
		return array
	}

	// Custom submit handler to wrap the useChat submit functionality
	function hSubmit(e: React.FormEvent<HTMLFormElement>) {
		handleSubmit(e)
		setUserPrompt(input)
	}

	// Custom input change handler to wrap the useChat input change functionality
	function hInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		const newValue = e.target.value
		handleInputChange(e)
		setUserPrompt(newValue)
	}

	return (
		<div className="flex flex-col items-center justify-center px-6">
			<Heading {...generator} />
			<div className="w-full max-w-6xl duration-300 ease-in-out animate-in">
				<form onSubmit={hSubmit} ref={formRef}>
					<div className="relative flex items-center gap-4 rounded-md border px-6 md:px-12">
						<Textarea
							ref={inputRef}
							disabled={status !== "awaiting_message"}
							tabIndex={0}
							onKeyDown={onKeyDown}
							rows={1}
							value={input === "" ? userPrompt : input}
							onChange={hInputChange}
							onFocus={handleFocus}
							onBlur={handleBlur}
							spellCheck={false}
							className="max-h-[200px] w-full resize-none bg-transparent py-[1.3rem] focus-within:outline-none"
						/>
						{input === "" && userPrompt === "" && !isFocused && (
							<div className="pointer-events-none absolute inset-x-6 inset-y-0 right-20 flex items-center justify-start bg-black bg-clip-text text-transparent dark:bg-white">
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
						{/* Submit prompt button */}
						<div className="self-start py-[1.3rem]">
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											type="submit"
											size="icon"
											disabled={status !== "awaiting_message" || input === ""}
										>
											<CornerDownLeft />
											<span className="sr-only">{`...`}</span>
										</Button>
									</TooltipTrigger>
									<TooltipContent>{`...`}</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</div>
					</div>
				</form>
			</div>

			{/* TODO: Ideas section currnetly chat interface */}
			<div className="mt-8 flex w-full max-w-6xl flex-col gap-4">
				{messages.map((message, index) => (
					<div
						key={index}
						className={cn(
							"flex items-center justify-between gap-4 rounded-md border p-4",
							{
								"bg-primary/10": message.role === "user",
								"bg-primary/20": message.role === "assistant",
							}
						)}
					>
						<div className="flex items-center gap-4">
							<div className="text-primary">
								<Zap />
							</div>
							<div>
								<p className="text-sm font-bold">
									{message.role.toUpperCase()}
								</p>
								<p>{message.content}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
