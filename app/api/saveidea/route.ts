import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import { db } from "@/lib/db"


export async function POST(req: NextRequest) {
	const { userId } = auth()
	if (!userId) {
		return new NextResponse("Unauthorized", { status: 401 })
	}

	const { title, description, userprompt, ideacontext } = await req.json()
	if (!title || !description || !userprompt) {
		return new NextResponse("Missing fields", { status: 400 })
	}

	const idea = {
		userId,
		userprompt,
		title,
		description,
		ideacontext,
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
			return NextResponse.json({message: "Idea saved", ideaId: res.id}, { status: 200 })
		}
	} catch (error) {
		console.error("Error saving idea", error)
		return new NextResponse("Internal Server Error", { status: 500 })
	}
}

export async function PATCH(req: NextRequest) {
	const { userId } = auth();
	if (!userId) {
		return new NextResponse("Unauthorized", { status: 401 });
	}

	const { ideaId, ideacontext } = await req.json();
	if (!ideaId || !ideacontext) {
		return new NextResponse("Missing fields", { status: 400 });
	}

	console.log("Updating idea...");
	try {
		const res = await db.idea.update({
			where: {
				id: ideaId,
				userId,
			},
			data: {
				ideacontext,
			},
		});
		if (res) {
			console.log("Idea updated");
			return new NextResponse("Idea updated", { status: 200 });
		}
	} catch (error) {
		console.error("Error updating idea", error);
		return new NextResponse("Internal Server Error", { status: 500 });
	}
}
