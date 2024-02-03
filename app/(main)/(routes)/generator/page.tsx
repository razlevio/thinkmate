"use client"

import { useRef, useState } from "react"
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
	const generator = {
		title: "Generator",
		description: "Generate ideas across various domains.",
		icon: Zap,
		iconColor: "text-primary",
		bgColor: "bg-primary/10",
	}

	const { messages, input, handleInputChange, handleSubmit, isLoading } =
		useChat({
			api: "/api/chat",
		})
	const status = isLoading ? "loading" : "awaiting_message"
	const { formRef, onKeyDown } = useEnterSubmit()
	const inputRef = useRef<HTMLTextAreaElement>(null)
	const [isFocused, setIsFocused] = useState(false);

	const handleFocus = () => setIsFocused(true);
	const handleBlur = () => {
			setIsFocused(false);
			if (input.trim() === "") {
					// Logic to show typewriter again if needed
			}
	};

	return (
		<div className="flex flex-col items-center justify-center px-6">
			<Heading {...generator} />
			<div className="w-full max-w-6xl duration-300 ease-in-out animate-in">
				<form onSubmit={handleSubmit} ref={formRef}>
					<div className="relative flex items-center gap-4 rounded-md border px-12">
						<Textarea
							ref={inputRef}
							disabled={status !== "awaiting_message"}
							tabIndex={0}
							onKeyDown={onKeyDown}
							rows={1}
							value={input}
							onChange={handleInputChange}
							onFocus={handleFocus}
							onBlur={handleBlur}
							spellCheck={false}
							className="max-h-[200px] w-full resize-none bg-transparent py-[1.3rem] focus-within:outline-none"
						/>
						{input === "" && !isFocused && (
							<div className="pointer-events-none absolute inset-x-12 inset-y-0 flex items-center justify-start bg-primary bg-clip-text text-transparent">
								<TypewriterComponent
									options={{
										strings: ["Food", "Marketing", "Business"],
										autoStart: true,
										loop: true,
										cursor: "|", // This enables the cursor
									}}
								/>
							</div>
						)}
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
