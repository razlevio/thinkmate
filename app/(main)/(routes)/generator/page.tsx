"use client"

import React, { useRef, useState } from "react"
import { useChat } from "ai/react"
import { motion } from "framer-motion"
import { CornerDownLeft, Zap } from "lucide-react"
import Textarea from "react-textarea-autosize"
import TypewriterComponent from "typewriter-effect"

import { cn } from "@/lib/utils"
import { useEnterSubmit } from "@/hooks/use-enter-submit"
import { Button } from "@/components/ui/button"
import { Heading } from "@/app/(main)/_components/heading"

import { Idea } from "../generator/_components/idea"

export default function GeneratorPage() {
	const generator = {
		title: "Generator",
		description: "Generate ideas across various domains.",
		icon: Zap,
		iconColor: "text-primary",
		bgColor: "bg-primary/10",
	}

	const examplePrompts = [
		"fusion dishes blending Italian and Japanese cuisines",
		"Ideas to make comfort foods healthier",
		"Unique ice cream flavor combinations",
		"Themed at-home date night ideas",
		"Outdoor date activities for nature lovers",
		"Philosophical questions unanswered by technology",
		"Applying ancient philosophies to modern dilemmas",
		"Finding meaning in a digital world",
		"Using digital media for a positive legacy",
		"Unique DIY tech-craft projects",
		"Fun, unconventional physical activities",
		"Under-the-radar unique travel destinations",
		"Beyond-the-norm romantic gestures",
		"Couple growth and learning ideas",
		"Adventure and exploration in relationships",
		"Creative boundary-pushing challenges",
		"Accessible 'bucket list' experiences",
		"Ways to make my morning routine more energizing",
		"Quick healthy dinner recipes for busy weeknights",
		"Creative home office setup ideas",
		"Fun weekend projects for DIY enthusiasts",
		"Effective stress-relief techniques for professionals",
		"Innovative ways to stay fit without a gym",
		"Ideas for virtual team-building activities",
		"Unique themes for a friend's party",
		"Ideas to improve personal finance management",
		"Ideas to enhance creativity in daily tasks",
		"Ideas for upcycling household items into art",
		"Travel-themed date night ideas at home",
		"Mindfulness exercises for beginners",
		"Homemade natural beauty treatment recipes",
		"Ideas to make learning a new concept fun and effective",
	]

	const { formRef, onKeyDown } = useEnterSubmit()
	const [isFocused, setIsFocused] = useState(false)
	const [typeWriterStrings, setTypeWriterStrings] = useState(
		shuffleArray(examplePrompts)
	)
	const [userPrompt, setUserPrompt] = useState("")
	const {
		messages,
		setMessages,
		input,
		setInput,
		stop,
		handleInputChange,
		handleSubmit,
		isLoading,
	} = useChat({ api: "/api/ideas" })

	const [isGenerateMoreButton, setIsGenerateMoreButton] = useState(false)

	function shuffleArray(array: string[]) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[array[i], array[j]] = [array[j], array[i]]
		}
		return array
	}

	async function hSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setMessages([])
		handleSubmit(e)
		setIsGenerateMoreButton(true)
	}

	function hInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		handleInputChange(e)
		setUserPrompt(e.target.value)
	}

	function handleFocus() {
		setIsFocused(true)
	}

	function handleBlur() {
		setTypeWriterStrings(shuffleArray(examplePrompts))
		setIsFocused(false)
	}

	async function handleGenerateMore(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		await setInput(userPrompt)
		handleSubmit(e)
	}

	return (
		<div className="flex flex-col items-center justify-center px-6">
			<Heading {...generator} />
			<motion.div
				className="w-full max-w-6xl"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3, ease: "easeInOut" }}
			>
				<form onSubmit={hSubmit} ref={formRef}>
					<div className="relative flex items-center gap-4 rounded-md border px-6 md:px-12">
						<Textarea
							tabIndex={0}
							rows={1}
							disabled={isLoading}
							onKeyDown={onKeyDown}
							value={userPrompt}
							onChange={hInputChange}
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
			</motion.div>
			<div className="mt-12 grid max-w-3xl grid-cols-1 gap-6">
				{messages
					.filter((message) => message.role === "assistant") // Filter for messages from the AI
					.flatMap((message, messageIndex) =>
						message.content
							.split("\n")
							.filter((line) => line.trim() !== "") // Filter out empty lines
							.map((idea, index) => {
								// Split the idea into name and text, then trim whitespace
								let [title, description] = idea
									.split(":")
									.map((part) => part.trim())
								// Cleanup step: Remove leading numbers and periods from the idea name
								title = title?.replace(/^\d+\.\s*/, "")
								// Cleanup step: Remove quotation marks from title and description
								title = title?.replace(/["“”]/g, "")
								description = description?.replace(/["“”]/g, "")

								return (
									<Idea
										key={`${messageIndex}-${index}`} // Unique key for each idea, combining message and idea index
										title={title}
										description={description}
										userprompt={userPrompt}
										isLoading={isLoading}
									/>
								)
							})
					)}
			</div>
			<div className="mt-12 flex w-full items-center justify-center">
				<form onSubmit={handleSubmit}>
					<Button
						disabled={isLoading}
						className={isGenerateMoreButton && !isLoading ? "block" : "hidden"}
						variant={"outline"}
						type="submit"
						onClick={() => setInput(userPrompt)}
					>
						Generate More
					</Button>
				</form>
			</div>
		</div>
	)
}
