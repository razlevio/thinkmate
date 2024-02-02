"use client"

import { useEffect, useRef } from "react"
import { useChat } from "ai/react"
import { CornerDownLeft, Zap } from "lucide-react"
import Textarea from "react-textarea-autosize"

import { cn } from "@/lib/utils"
import { useEnterSubmit } from "@/hooks/use-enter-submit"
import { Button } from "@/components/ui/button"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import { Heading } from "@/components/heading"

export default function GeneratorPage() {
	const generator = {
		title: "Generator",
		description: "Generate ideas about anything.",
		icon: Zap,
		iconColor: "text-primary",
		bgColor: "bg-primary/10",
	}

	const { messages, input, handleInputChange, handleSubmit, isLoading } =
		useChat()
	const status = isLoading ? "loading" : "awaiting_message"
	const { formRef, onKeyDown } = useEnterSubmit()
	const inputRef = useRef<HTMLTextAreaElement>(null)

	return (
		<div className="flex flex-col items-center justify-center px-6">
			<Heading {...generator}>Generator</Heading>
			<div className="w-full max-w-6xl duration-300 ease-in-out animate-in">
				<form onSubmit={handleSubmit} ref={formRef}>
					<div className="flex items-center justify-between gap-4 rounded-md border px-12">
						<Textarea
							ref={inputRef}
							disabled={status !== "awaiting_message"}
							tabIndex={0}
							onKeyDown={onKeyDown}
							rows={1}
							value={input}
							onChange={handleInputChange}
							placeholder={`...`}
							spellCheck={false}
							className="max-h-[200px] w-full resize-none bg-transparent py-[1.3rem] focus-within:outline-none"
						/>

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
								<p className="text-sm font-bold">{message.role.toUpperCase()}</p>
								<p>{message.content}</p>
							</div>
						</div>
					</div>
				))}
		</div>
	</div>
	)
}
