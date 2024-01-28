"use client"

import { useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { Message, experimental_useAssistant as useAssistant } from "ai/react"
import { AlertCircle, CornerDownLeft, Shrub } from "lucide-react"
import Textarea from "react-textarea-autosize"

import { useEnterSubmit } from "@/hooks/use-enter-submit"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import { Heading } from "@/components/heading"

export default function VisionPage() {
	const { user } = useUser()
	const { status, messages, input, submitMessage, handleInputChange, error } =
		useAssistant({
			api: "/api/vision",
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
		<div>
			<Heading
				title="Vision"
				description="Ideas that helps define future aspirations, focusing on character traits and mutual goals."
				icon={Shrub}
				iconColor="text-emerald-500"
				bgColor="bg-emerald-500/10"
			/>

			<div className="mx-auto flex w-full max-w-4xl flex-col px-4">
				{error != null && (
					<Alert variant="destructive">
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
									<Shrub
										className={
											"size-10 rounded-full bg-emerald-500/10 p-1 text-emerald-500"
										}
									/>
								</div>
								<div>{m.content}</div>
							</div>
						)}
						{m.role === "user" && (
							<div className="flex gap-x-3">
								<Avatar>
									<AvatarImage src={user?.imageUrl} />
									<AvatarFallback>RL</AvatarFallback>
								</Avatar>
								<div>{m.content}</div>
							</div>
						)}
						<Separator className="my-6" />
					</div>
				))}

				{status === "in_progress" && (
					<div className="mb-8 h-8 w-full max-w-md animate-pulse rounded-lg bg-gray-300 p-2 dark:bg-gray-600" />
				)}
				<div className="fixed inset-x-0 bottom-0 mt-4 w-full max-w-6xl duration-300 ease-in-out animate-in md:pl-[250px] lg:left-1/2 lg:-translate-x-1/2" >
					<div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
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
									placeholder="Ask anything related to your vision"
									spellCheck={false}
									className="min-h-[60px] w-full resize-none bg-transparent py-[1.3rem] focus-within:outline-none sm:text-sm"
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
														Ask anything related to your vision
													</span>
												</Button>
											</TooltipTrigger>
											<TooltipContent>
												Ask anything related to your vision
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
