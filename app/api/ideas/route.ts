import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import { OpenAIStream, StreamingTextResponse } from "ai"

import { openai } from "@/lib/openai"

// IMPORTANT! Set the runtime to edge
export const runtime = "edge"

// Function to clean the userPrompt
function cleanUserPrompt(prompt: string) {
	// Remove numbers
	prompt = prompt.toLowerCase()
	let cleanedPrompt = prompt.replace(
		/\b(one|two|three|four|five|six|seven|eight|nine|ten|generate|\d+)\b/gi,
		""
	)
	cleanedPrompt = cleanedPrompt.replace(/\s\s+/g, " ").trim()

	return cleanedPrompt
}

export async function POST(req: NextRequest) {
	const SYSTEM_PROMPT =
		'For each user message, generate exactly three distinct and actionable ideas, format each idea as "{idea-title}:{idea-description}" and separate each idea with a new line, using a colon (":") to delineate each idea title from its description., ensure each idea is concise (under 250 characters each) for clear comprehension and immediate action, the ideas must be unique, and feasibly executable. Always provide three ideas, no more, no less'
	try {
		const { userId } = auth()

		if (!userId) return new NextResponse("Unauthorized", { status: 401 })
		if (!openai.apiKey)
			return new NextResponse("OpenAI API Key not configured", { status: 500 })

		const { messages } = await req.json()

		console.log(messages)

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
