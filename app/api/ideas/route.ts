import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import OpenAI from "openai"

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

// IMPORTANT! Set the runtime to edge
export const runtime = "edge"

export async function POST(req: NextRequest) {
	// System prompt that remains constant
	const SYSTEM_PROMPT = 'You are tasked with generating innovative ideas within a specified theme provided by a user. Your goal is to come up with 9 distinct and actionable ideas that are practical and relevant to the theme. These ideas should be diverse, covering various aspects of the topic to offer a comprehensive set of solutions or suggestions. Please format your response in JSON, with each idea encapsulated as a string within an array of ideas. Ensure that each idea is succinct yet descriptive enough for straightforward interpretation and potential implementation. Aim for consistency in the length and complexity of the descriptions to facilitate uniform rendering in a UI application. Here is the structure for your response -> ["idea 1", "idea 2", "idea 3", ..., "idea 9"] Keep in mind: Each idea should be unique and stand on its own. Ideas should be practical and applicable to the given theme. Maintain a similar level of detail across all ideas to ensure uniformity.'

	try {
		// const { userId } = auth()
		// if (!userId) return new NextResponse("Unauthorized", { status: 401 })
		let userPrompt
		try {
			const { messages } = await req.json()
			userPrompt = messages[0].content
		} catch (error) {
			console.error("Error parsing request body:", error)
			return new NextResponse("Bad Request: Invalid JSON", { status: 400 })
		}

		// Check for the presence of the user prompt
		if (!userPrompt) {
			console.error("User prompt is missing in the request body")
			return new NextResponse("Bad Request: Missing user prompt", {
				status: 400,
			})
		}

		// Ensure the OpenAI API key is configured
		if (!openai.apiKey) {
			console.error("OpenAI API Key not configured")
			return new NextResponse(
				"Internal Server Error: OpenAI API Key not configured",
				{ status: 500 }
			)
		}

		// Make the API call to OpenAI
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
					content: userPrompt,
				},
			],
		})

		const ideas = response.choices[0].message.content

		if (!ideas) {
			console.error("No ideas generated")
			return new NextResponse("Internal Server Error: No ideas generated", {
				status: 500,
			})
		}

		// Assuming the response structure is as expected, return the parsed content
		return NextResponse.json(ideas, {
			status: 200,
		})
	} catch (error) {
		console.error("Error in processing:", error)
		return new NextResponse("Internal Server Error", { status: 500 })
	}
}

// export async function POST(req: NextRequest) {

// 	console.log("Function invoked"); // Initial log to confirm function invocation

// 	const SYSTEM_PROMPT = 'You are tasked with generating innovative ideas within a specified theme provided by a user. Your goal is to come up with 9 distinct and actionable ideas that are practical and relevant to the theme. These ideas should be diverse, covering various aspects of the topic to offer a comprehensive set of solutions or suggestions. Please format your response in JSON, with each idea encapsulated as an object within an array. Ensure that each idea is succinct yet descriptive enough for straightforward interpretation and potential implementation. Aim for consistency in the length and complexity of the descriptions to facilitate uniform rendering in a UI application. Here is the structure for your response:[  {"idea": "Brief description of Idea 1."},  {"idea": "Brief description of Idea 2."},  {"idea": "Brief description of Idea 3."},  ...  {"idea": "Brief description of Idea 9."}] Keep in mind: Each idea should be unique and stand on its own. Ideas should be practical and applicable to the given theme. Maintain a similar level of detail across all ideas to ensure uniformity.'

// 	try {
// 		// const { userId } = auth()
// 		// if (!userId) return new NextResponse("Unauthorized", { status: 401 })
// 		if (!openai.apiKey) return new NextResponse("OpenAI API Key not configured", { status: 500 })

// 		const { userPrompt } = await req.json()

// 		// Request the OpenAI API for the response based on the prompt
// 		const response = await openai.chat.completions.create({
// 			model: "gpt-3.5-turbo-0125",
// 			response_format: { type: "json_object" },
// 			messages: [
// 				{
// 					role: "system",
// 					content: SYSTEM_PROMPT,
// 				},
// 				{
// 					role: "user",
// 					content: userPrompt,
// 				}
// 			]
// 		})

// 		console.log("Raw Response:", response);

// 		return NextResponse.json(response.choices[0].message.content, { status: 200 })

// 	} catch (error) {
// 		console.log("[IDEAS_ERROR]", error)
// 		return new NextResponse("Internal error", { status: 500 })
// 	}
// }
