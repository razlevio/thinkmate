import { NextRequest, NextResponse } from 'next/server';
import { auth } from "@clerk/nextjs"
import { experimental_AssistantResponse } from "ai";
import { MessageContentText } from "openai/resources/beta/threads/messages/messages";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth()
		const input: {
			threadId: string | null;
			message: string;
		} = await req.json();

		if(!userId) return new NextResponse("Unauthorized", { status: 401 })
    if(!openai.apiKey) return new NextResponse("OpenAI API Key not configured", { status: 500 })

		// Create a thread if needed
		const threadId = input.threadId ?? (await openai.beta.threads.create({})).id;

		// Add a message to the thread
		const createdMessage = await openai.beta.threads.messages.create(threadId, {
			role: "user",
			content: input.message,
		});

		return experimental_AssistantResponse(
			{ threadId, messageId: createdMessage.id },
			async ({ threadId, sendMessage, sendDataMessage }) => {
				// Run the assistant on the thread
				const run = await openai.beta.threads.runs.create(threadId, {
					assistant_id:
						process.env.LEGACY_ASSISTANT_ID ??
						(() => {
							throw new Error("LEGACY_ASSISTANT_ID is not set");
						})(),
				});

				async function waitForRun(run: OpenAI.Beta.Threads.Runs.Run) {
					// Poll for status change
					while (run.status === "queued" || run.status === "in_progress") {
						// delay for 500ms:
						await new Promise((resolve) => setTimeout(resolve, 500));

						run = await openai.beta.threads.runs.retrieve(threadId!, run.id);
					}

					// Check the run status
					if (
						run.status === "cancelled" ||
						run.status === "cancelling" ||
						run.status === "failed" ||
						run.status === "expired"
					) {
						throw new Error(run.status);
					}
				}

				await waitForRun(run);

				// Get new thread messages (after our message)
				const responseMessages = (
					await openai.beta.threads.messages.list(threadId, {
						after: createdMessage.id,
						order: "asc",
					})
				).data;

				// Send the messages
				for (const message of responseMessages) {
					sendMessage({
						id: message.id,
						role: "assistant",
						content: message.content.filter(
							(content) => content.type === "text"
						) as Array<MessageContentText>,
					});
				}
			}
		);

  } catch(error) {
    console.log("[LEGACY_ERROR]", error)
    return new NextResponse("Internal error", { status: 500})
  }
}
