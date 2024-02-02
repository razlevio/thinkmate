import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import { OpenAIStream, StreamingTextResponse } from "ai"
import OpenAI from "openai"
import { MessageContentText } from "openai/resources/beta/threads/messages/messages"

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
})

// IMPORTANT! Set the runtime to edge
export const runtime = "edge"

export async function POST(req: NextRequest) {
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
			messages: messages,
		})

		const stream = OpenAIStream(response)
		return new StreamingTextResponse(stream)
		
	} catch (error) {
		console.log("[DATES_ERROR]", error)
		return new NextResponse("Internal error", { status: 500 })
	}
}
