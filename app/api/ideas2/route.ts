import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import { OpenAIStream, StreamingTextResponse } from "ai"
import OpenAI from "openai"

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

// IMPORTANT! Set the runtime to edge
export const runtime = "edge"

export async function POST(req: NextRequest) {
	const SYSTEM_PROMPT =
		'You are a creative ideas generator, for every user message you need to generate 3 ideas that are clearly labeled "1. idea-name: idea-text", "2. idea-name: idea-text", "3. idea-name: idea-text" only return these 3 ideas, nothing else. Make sure each generated idea is less than 300 characters, ensure that each ideas is succinct yet descriptive enough for straightforward interpretation and potential implementation. Aim for consisitnecy in the length and complexity of the ideas to facilitate uniformity. Keep in mind each idea should be unique and stand on its own, ideas should be practical and applicable to the context that will be provided through user messages.'

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
