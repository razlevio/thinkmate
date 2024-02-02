"use client"

import { useEffect, useRef } from "react"
import { Message, experimental_useAssistant as useAssistant } from "ai/react"
import { CornerDownLeft } from "lucide-react"
import Textarea from "react-textarea-autosize"

import { cn } from "@/lib/utils"
import { useEnterSubmit } from "@/hooks/use-enter-submit"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"

export function PromptForm() {
	const { status, messages, input, submitMessage, handleInputChange, error } =
		useAssistant({
			api: `/api/vision`,
		})

	const { formRef, onKeyDown } = useEnterSubmit()

	// When status changes to accepting messages, focus the input:
	const inputRef = useRef<HTMLTextAreaElement>(null)
	useEffect(() => {
		if (status === "awaiting_message") {
			inputRef.current?.focus()
		}
	}, [status])

	return (
		<div className="w-full max-w-6xl duration-300 ease-in-out animate-in">
			<form onSubmit={submitMessage} ref={formRef}>
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
	)
}
