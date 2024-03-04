"use client"

import { useEffect, useState } from "react"
import { useChat } from "ai/react"
import { motion } from "framer-motion"
import { CornerDownLeft, Plus, Shuffle, Zap } from "lucide-react"
import Textarea from "react-textarea-autosize"
import TypewriterComponent from "typewriter-effect"

import { examplePrompts } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { useEnterSubmit } from "@/hooks/use-enter-submit"
import { useProModal } from "@/hooks/use-pro-modal"
import { Button } from "@/components/ui/button"
import { Heading } from "@/app/(main)/_components/heading"

import { revalidate } from "../../_actions/revalidate"
import { Idea } from "../generator/_components/idea"

export default function GeneratorPage() {
	const generator = {
		title: "Generator",
		description: "Generate ideas across various domains",
		icon: Zap,
		iconColor: "text-primary",
		bgColor: "bg-primary/10",
	}
	const proModal = useProModal()
	const { formRef, onKeyDown } = useEnterSubmit()
	const [isFocused, setIsFocused] = useState(false)
	const [typeWriterStrings, setTypeWriterStrings] = useState(
		shuffleArray(examplePrompts)
	)
	const [userPrompt, setUserPrompt] = useState("")
	const [isGenerateMoreButton, setIsGenerateMoreButton] = useState(false)
	const [apiLimitStatus, setApiLimitStatus] = useState(false)
	const [apiLimitCount, setApiLimitCount] = useState(0)
	const [subscription, setSubscription] = useState(false)

	useEffect(() => {
		fetchApiLimitStatus()
			.then(({ allowed, count }) => {
				setApiLimitStatus(allowed)
				setApiLimitCount(count)
			})
			.catch((error) =>
				console.error("Failed to fetch API limit status:", error)
			)

		fetchSubscriptionStatus()
			.then((status) => {
				setSubscription(status)
			})
			.catch((error) => {
				console.error("Failed to fetch subscription status:", error)
			})
	}, [])

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

	// *********************************** FUNCTIONS *********************************** //

	function shuffleArray(array: string[]) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[array[i], array[j]] = [array[j], array[i]]
		}
		return array
	}

	async function handleGenerate(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		if (!apiLimitStatus && !subscription) {
			proModal.onOpen()
			setIsGenerateMoreButton(false)
			return
		}

		setMessages([])
		handleSubmit(e)
		setIsGenerateMoreButton(true)

		// Increment API usage
		if (!subscription) {
			await incrementApiUsage()
			revalidate("/")
			// Fetch and update API limit status after submission
			try {
				const { allowed, count } = await fetchApiLimitStatus()
				setApiLimitStatus(allowed)
				setApiLimitCount(count)
			} catch (error) {
				console.error("Error updating API limit status after submission:", error)
			}
		}
	}

	async function handleLoadMore(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		// Update the input again with the user-prompt to allow for generating more ideas
		await setInput(userPrompt)

		if (!apiLimitStatus && !subscription) {
			proModal.onOpen()
			setIsGenerateMoreButton(false)
			return
		}
		handleSubmit(e)

		if (!subscription) {
			// Increment API usage
			await incrementApiUsage()
			revalidate("/")

			// Fetch and update API limit status after submission
			try {
				const { allowed, count } = await fetchApiLimitStatus()
				setApiLimitStatus(allowed)
				setApiLimitCount(count)
			} catch (error) {
				console.error(
					"Error updating API limit status after submission:",
					error
				)
			}
		}
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

	function handleRandomGeneration() {
		if (!apiLimitStatus && !subscription) {
			proModal.onOpen()
			return
		}

		setMessages([])
		const randomPrompt = examplePrompts[Math.floor(Math.random() * examplePrompts.length)]
		setUserPrompt(randomPrompt)
		setInput(randomPrompt)
		setIsGenerateMoreButton(true)
	}

	async function fetchApiLimitStatus(): Promise<{
		allowed: boolean
		count: number
	}> {
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_APP_URL}/api/api-limit`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			)

			if (!res.ok) {
				throw new Error("Failed to fetch API limit status")
			}

			const { message, count } = await res.json()
			return { allowed: message, count }
		} catch (error) {
			console.error("Error fetching API limit status:", error)
			throw error
		}
	}

	async function incrementApiUsage() {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_APP_URL}/api/api-limit`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
				}
			)

			if (!response.ok) {
				throw new Error("Failed to increment API usage")
			}

			// You can process the response if needed, for example, to confirm the increment was successful
			const data = await response.json()
			console.log("API usage incremented successfully", data)
		} catch (error) {
			console.error("Error incrementing API usage:", error)
		}
	}

	async function fetchSubscriptionStatus(): Promise<boolean> {
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_APP_URL}/api/subscription`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			)

			if (!res.ok) {
				throw new Error("Failed to fetch subscription status")
			}

			const { message } = await res.json()
			return message
		} catch (error) {
			console.error("Error fetching subscription status:", error)
			throw error
		}
	}

	return (
		<div className="flex flex-col items-center justify-center px-6">
			{/* Heading */}
			<Heading {...generator} />

			{/* Input */}
			<motion.div
				className="w-full max-w-6xl"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3, ease: "easeInOut" }}
			>
				<form onSubmit={handleGenerate} ref={formRef}>
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
							<Button
								variant={"main"}
								type="submit"
								size="icon"
								disabled={isLoading}
							>
								<CornerDownLeft />
								<span className="sr-only">Generate Button</span>
							</Button>
						</div>
					</div>
				</form>
			</motion.div>

			{/* Random Button */}
			<motion.form
				onSubmit={handleGenerate}
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3, ease: "easeInOut" }}
				className="mt-2"
			>
				<Button
					onClick={handleRandomGeneration}
					disabled={isLoading}
					className="bg-background-300/10 border-primary-500/20 relative mx-auto mt-4 rounded-full border px-4 py-2 text-center text-foreground backdrop-blur-sm hover:text-primary-foreground"
				>
					<span>Random</span>
					<Shuffle className="ml-2 size-4" />
					<div className="absolute inset-x-0  -bottom-px mx-auto h-px w-3/4 bg-gradient-to-r from-transparent via-primary to-transparent" />
				</Button>
			</motion.form>

			{/* Ideas */}
			<div className="mt-8 grid max-w-3xl grid-cols-1 gap-6">
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

			{/* Load More Button */}
			<div
				className={cn(
					"mt-8 flex w-full items-center justify-center",
					isLoading && "hidden"
				)}
			>
				<form onSubmit={handleLoadMore}>
					<Button
						disabled={isLoading}
						className={cn(
							"bg-background-300/10 border-primary-500/20 relative mx-auto mt-4 rounded-full border px-4 py-2 text-center text-foreground backdrop-blur-sm hover:text-primary-foreground",
							!isGenerateMoreButton && "hidden"
						)}
						onClick={() => setInput(userPrompt)}
					>
						<span>Load more</span>
						<Plus className="ml-2 size-4" />
						<div className="absolute inset-x-0  -bottom-px mx-auto h-px w-3/4 bg-gradient-to-r from-transparent via-primary to-transparent" />
					</Button>
				</form>
			</div>
		</div>
	)
}
