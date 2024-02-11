import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import { db } from "@/lib/db"

export async function POST(req: NextRequest) {
	const { userId } = auth()
	if (!userId) {
		return new NextResponse("Unauthorized", { status: 401 })
	}

	const { ideaId } = await req.json()
	if (!ideaId) {
		return new NextResponse("Missing fields", { status: 400 })
	}

	console.log("Deleting idea...")
	try {
		const res = await db.idea.delete({
			where: {
				id: ideaId,
			},
		})
		if (res) {
			console.log("Idea deleted")
			return new NextResponse("Idea deleted", { status: 200 })
		}
	} catch (error) {
		console.error("Error saving idea", error)
		return new NextResponse("Internal Server Error", { status: 500 })
	}
}
