import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import { OpenAIStream, StreamingTextResponse } from "ai"

import { openai } from "@/lib/openai"

// IMPORTANT! Set the runtime to edge
export const runtime = "edge"

export async function POST(req: NextRequest) {
	try {
		const { userId } = auth()

		if (!userId) return new NextResponse("Unauthorized", { status: 401 })
		if (!openai.apiKey)
			return new NextResponse("OpenAI API Key not configured", { status: 500 })

		const { title, description } = await req.json()

		const INJECTION_PROMPT = `Observe the following idea:
		title: ${title}, description: ${description}.
		Generate 6 and only 6 short and actionable context to enhance this idea, each point should offer valuable insight, address practical aspects, and suggest creative enhancements related to
		the idea, making it more enjoyable, feasible, and memorable. Ensure your suggestions are relevant, actionable, short, on-point
		and tailored to enhance the given idea, Format your response as a numbered list, providing
		six short and concise distinct points of context one sentence maximum each`

		// Request the OpenAI API for the response based on the prompt
		const response = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			stream: true,
			max_tokens: 500,
			temperature: 0.7,
			frequency_penalty: 1,
			presence_penalty: 1,
			messages: [
				{
					role: "user",
					content: INJECTION_PROMPT,
				},
			],
		})

		const stream = OpenAIStream(response)
		return new StreamingTextResponse(stream)
	} catch (error) {
		console.log("[IDEASCONTEXT_ERROR]", error)
		return new NextResponse("Internal error", { status: 500 })
	}
}
