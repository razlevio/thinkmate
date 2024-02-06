import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import OpenAI from "openai"

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

// IMPORTANT! Set the runtime to edge
export const runtime = "edge"

export async function POST(req: NextRequest) {
	const SYSTEM_PROMPT =
		'You are tasked with generating innovative ideas within a specified theme provided by a user. Your goal is to come up with 9 distinct and actionable ideas that are practical and relevant to the theme. These ideas should be diverse, covering various aspects of the topic to offer a comprehensive set of solutions or suggestions. Format your response in JSON, with each idea encapsulated as a string within an array of ideas. Ensure that each idea is succinct yet descriptive enough for straightforward interpretation and potential implementation. Aim for consistency in the length and complexity of the descriptions to facilitate uniform rendering in a UI application. Here is the structure for your response -> { ideas: ["idea 1", "idea 2", "idea 3", ..., "idea 9"]} Keep in mind: Each idea should be unique and stand on its own. Ideas should be practical and applicable to the given theme. Maintain a similar level of detail across all ideas to ensure uniformity.'

	try {
		// const { userId } = auth()
		// if (!userId) return new NextResponse("Unauthorized", { status: 401 })
		if (!openai.apiKey)
			return new NextResponse("OpenAI API Key not configured", { status: 500 })

		const { prompt } = await req.json()

		// Request the OpenAI API for the response based on the prompt
		const response = await openai.chat.completions.create({
			model: "gpt-3.5-turbo-0125",
			response_format: { type: "json_object" },
			messages: [
				{
					role: "system",
					content: SYSTEM_PROMPT,
				},
				{
					role: "user",
					content: prompt,
				},
			],
		})

		return NextResponse.json(response.choices[0].message.content, {
			status: 200,
		})
	} catch (error) {
		console.log("[IDEAS_ERROR]", error)
		return new NextResponse("Internal error", { status: 500 })
	}
}
