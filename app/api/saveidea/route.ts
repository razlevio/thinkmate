import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import { db } from "@/lib/db"

export async function POST(req: NextRequest) {
	const { userId } = auth()
	if (!userId) {
		return new NextResponse("Unauthorized", { status: 401 })
	}

	const { title, description, userprompt } = await req.json()
	if (!title || !description || !userprompt) {
		return new NextResponse("Missing fields", { status: 400 })
	}

	const idea = {
		userId,
		userprompt,
		title,
		description,
	}

	console.log("Saving idea...")
	try {
		const res = await db.idea.create({
			data: {
				...idea,
			},
		})
		if (res) {
			console.log("Idea saved")
			return new NextResponse("Idea saved", { status: 200 })
		}
	} catch (error) {
		console.error("Error saving idea", error)
		return new NextResponse("Internal Server Error", { status: 500 })
	}
}
