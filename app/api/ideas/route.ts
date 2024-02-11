import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import { OpenAIStream, StreamingTextResponse } from "ai"

import { db } from "@/lib/db"
import { openai } from "@/lib/openai"

// IMPORTANT! Set the runtime to edge
export const runtime = "edge"

// Function to clean the userPrompt
function cleanUserPrompt(prompt: string) {
	// Remove numbers
	prompt = prompt.toLowerCase()
	let cleanedPrompt = prompt.replace(
		/\b(one|two|three|four|five|six|seven|eight|nine|ten|for|generate|\d+)\b/gi,
		""
	)

	// Remove the words "ideas" and "idea", case-insensitive
	cleanedPrompt = cleanedPrompt.replace(/\b(ideas?|idea)\b/gi, "")

	// Optionally, you might want to remove extra spaces left after removal, especially if you're removing whole words
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
		const userPrompt = cleanUserPrompt(messages[0].content)
		const INJECTION_PROMPT = `Generate exactly three distinct and actionable ideas about ${userPrompt}, format each idea as "{idea-title}:{idea-description}" and separate each idea with a new line, using a colon (":") to delineate each idea title from its description. Ensure each idea is concise (under 250 characters each) for clear comprehension and immediate action, the ideas must be unique, and feasibly executable. Provide three ideas, no more, no less`

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
				{
					role: "user",
					content: userPrompt,
				},
			],
		})

		const stream = OpenAIStream(response)
		return new StreamingTextResponse(stream)
	} catch (error) {
		console.log("[IDEAS_ERROR]", error)
		return new NextResponse("Internal error", { status: 500 })
	}
}
