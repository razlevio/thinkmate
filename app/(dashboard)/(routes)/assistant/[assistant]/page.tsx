"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { Message, experimental_useAssistant as useAssistant } from "ai/react"
import { AlertCircle, CornerDownLeft, Shrub } from "lucide-react"
import Textarea from "react-textarea-autosize"

import { getAssistant } from "@/types/assistants"
import { cn } from "@/lib/utils"
import { useEnterSubmit } from "@/hooks/use-enter-submit"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import { Heading } from "@/components/heading"

export default function VisionPage({
	params,
}: {
	params: { assistant: string }
}) {
	const { user } = useUser()
	const router = useRouter()
	const { status, messages, input, submitMessage, handleInputChange, error } =
		useAssistant({
			api: `/api/${params.assistant}`,
		})

	const { formRef, onKeyDown } = useEnterSubmit()

		// When status changes to accepting messages, focus the input:
		const inputRef = useRef<HTMLTextAreaElement>(null)
		useEffect(() => {
			if (status === "awaiting_message") {
				inputRef.current?.focus()
			}
		}, [status])


	const assistant = getAssistant(params.assistant)
	if (!assistant) return router.push("/dashboard")

	return (
		<div>
			<Heading
				title={assistant.name}
				description={assistant.description}
				icon={assistant.icon}
				iconColor={assistant.color}
				bgColor={assistant.bgColor}
			/>

			<div className="mx-auto flex w-full max-w-4xl flex-col px-4">
				<div>
					<div className="flex gap-x-3">
						<div>
							<assistant.icon
								className={cn(
									"size-10 rounded-full p-2",
									assistant.bgColor,
									assistant.color
								)}
							/>
						</div>
						<div>{assistant.firstInitialMessage}</div>
					</div>
					<Separator className="my-6" />
				</div>
				{error != null && (
					<Alert variant="destructive" className="mb-6">
						<AlertCircle className="size-4" />
						<AlertTitle>Error</AlertTitle>
						<AlertDescription>{error.toString()}</AlertDescription>
					</Alert>
				)}

				{messages.map((m: Message) => (
					<div key={m.id} className="whitespace-pre-wrap">
						{m.role === "assistant" && (
							<div className="flex gap-x-3">
								<div>
									<assistant.icon
										className={cn(
											"size-10 rounded-full p-1",
											assistant.bgColor,
											assistant.color
										)}
									/>
								</div>
								<p>{m.content}</p>
							</div>
						)}
						{m.role === "user" && (
							<div className="flex gap-x-3">
								<Avatar>
									<AvatarImage src={user?.imageUrl} />
									<AvatarFallback>RL</AvatarFallback>
								</Avatar>
								<p>{m.content}</p>
							</div>
						)}
						<Separator className="my-6" />
					</div>
				))}

				{status === "in_progress" && (
					<div className="flex gap-x-3">
						<div>
							<Skeleton className="size-10 rounded-full" />
						</div>
						<div className="space-y-2">
							<Skeleton className="h-4 w-[300px]" />
							<Skeleton className="h-4 w-[200px]" />
						</div>
					</div>
				)}

				<div className="fixed inset-x-0 bottom-0 w-full max-w-6xl duration-300 ease-in-out animate-in md:pl-[250px] lg:left-1/2 lg:-translate-x-1/2">
					<div className="space-y-4 border-t bg-background p-4 lg:rounded-t-xl lg:border">
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
									placeholder={`Ask anything related to your ${assistant.name}`}
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
													disabled={
														status !== "awaiting_message" || input === ""
													}
												>
													<CornerDownLeft />
													<span className="sr-only">
														{`Ask anything related to your ${assistant.name}`}
													</span>
												</Button>
											</TooltipTrigger>
											<TooltipContent>
												{`Ask anything related to your ${assistant.name}`}
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
