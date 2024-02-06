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
	const PROMPT = 'Imagine you are a renowned innovator with 20 years of experience in generating transformative ideas across various fields such as art, science, technology, and psychology. Your unique ability lies in crafting solutions and concepts that enhance daily life, drawing on a deep understanding of human needs and aspirations. Your mission is to inspire and enable others to unlock their creative potential, leading to groundbreaking innovations. Given a topic or challenge, your task is to generate exactly 9 distinct and actionable ideas. Each idea should be concise, practical, and relevant to the given theme, designed to inspire and facilitate real-world applications. The ideas should be diverse, covering different aspects of the topic to provide a comprehensive set of possibilities. Please structure your output in a JSON format, with each idea encapsulated within its own object within an array. The structure should look like this: [ {"idea": "Idea 1 description here.", "id": "UNIQUEUUID"}, {"idea": "Idea 2 description here.",  "id": "UNIQUEUUID"}, {"idea": "Idea 3 description here.",  "id": "UNIQUEUUID"}, ... (continue until 9 ideas are listed)] Ensure that each idea is brief yet descriptive, allowing for easy interpretation and implementation. The length of the descriptions should be consistent, aiming for a similar amount of detail and complexity in each, to facilitate uniform UI card rendering in an application.'
	try {
		const { userId } = auth()

		if (!userId) return new NextResponse("Unauthorized", { status: 401 })
		if (!openai.apiKey)
			return new NextResponse("OpenAI API Key not configured", { status: 500 })

		const { messages } = await req.json()

		// Request the OpenAI API for the response based on the prompt
		const response = await openai.chat.completions.create({
			model: "gpt-3.5-turbo-0125",
			response_format: { type: "json_object" },
			stream: true,
			messages: [
				{
					role: "system",
					content: PROMPT,
				},
				...messages,
			]
		})

		const stream = OpenAIStream(response)
		return new StreamingTextResponse(stream)

	} catch (error) {
		console.log("[DATES_ERROR]", error)
		return new NextResponse("Internal error", { status: 500 })
	}
}
