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

	try {
		// First, find the idea's unique identifier based on the provided fields
		const idea = await db.idea.findFirst({
			where: {
				userId,
				userprompt,
				title,
				description,
			},
		})

		// If the idea exists, delete it using its unique identifier
		if (idea) {
			const res = await db.idea.delete({
				where: {
					id: idea.id,
				},
			})
			if (res) {
				console.log("Idea deleted")
				await revalidateDashboard()
				return new NextResponse("Idea deleted", { status: 200 })
			}
		} else {
			console.log("Idea not found")
			return new NextResponse("Idea not found", { status: 404 })
		}
	} catch (error) {
		console.error("Error saving idea", error)
		// Return a 500 Internal Server Error response in case of an exception
		return new NextResponse("Internal Server Error", { status: 500 })
	}
}
