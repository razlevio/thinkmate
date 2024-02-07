import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import { db } from "@/lib/db"
import { revalidateDashboard } from "@/app/(main)/_actions/main-actions"

export async function POST(req: NextRequest) {
	const { userId, user } = auth()
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
			await revalidateDashboard()
			return new NextResponse("Idea saved", { status: 200 })
		}
	} catch (error) {
		console.error("Error saving idea", error)
		// Return a 500 Internal Server Error response in case of an exception
		return new NextResponse("Internal Server Error", { status: 500 })
	}
}
