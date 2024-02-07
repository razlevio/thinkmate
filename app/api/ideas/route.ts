import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import { OpenAIStream, StreamingTextResponse } from "ai"
import { openai } from "@/lib/openai"

// IMPORTANT! Set the runtime to edge
export const runtime = "edge"

export async function POST(req: NextRequest) {
	const SYSTEM_PROMPT =
		'Respond to every user message by generating three distinct ideas, each formatted as "{idea-name}:{idea-text}" and presented on separate lines. Each idea must be concise, not exceeding 300 characters, to ensure clarity and ease of understanding for immediate application. Strive for consistency in length and detail across all ideas to maintain uniformity. Each idea should be unique, relevant to the user context, and practically implementable. Use a colon (":") to separate the idea name from its description, and ensure ideas are separated by new lines for clear delineation in the frontend'

	try {
		const { userId } = auth()

		if (!userId) return new NextResponse("Unauthorized", { status: 401 })
		if (!openai.apiKey)
			return new NextResponse("OpenAI API Key not configured", { status: 500 })

		const { messages } = await req.json()

		// Request the OpenAI API for the response based on the prompt
		const response = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			stream: true,
			max_tokens: 500,
			temperature: 0.7,
			top_p: 1,
			frequency_penalty: 1,
			presence_penalty: 1,
			messages: [
				{
					role: "system",
					content: SYSTEM_PROMPT,
				},
				...messages,
			],
		})

		const stream = OpenAIStream(response)
		return new StreamingTextResponse(stream)
	} catch (error) {
		console.log("[IDEAS_ERROR]", error)
		return new NextResponse("Internal error", { status: 500 })
	}
}
