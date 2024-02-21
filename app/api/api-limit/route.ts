import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import { MAX_FREE_COUNTS } from "@/lib/constants"
import { db } from "@/lib/db"

export async function POST(req: NextRequest) {
	const { userId } = auth()

	if (!userId) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
	}

	const userApiLimit = await db.userApiLimit.findUnique({
		where: {
			userId,
		},
	})

	if (userApiLimit) {
		await db.userApiLimit.update({
			where: {
				userId,
			},
			data: {
				count: userApiLimit.count + 1,
			},
		})
	} else {
		await db.userApiLimit.create({
			data: {
				userId,
				count: 1,
			},
		})
	}

	return NextResponse.json({ message: "Success" }, { status: 200 })
}

export async function GET(req: NextRequest) {
	const { userId } = auth()
	if (!userId) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
	}

	const userApiLimit = await db.userApiLimit.findUnique({
		where: {
			userId,
		},
	})

	if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
		return NextResponse.json({ message: true, count: userApiLimit?.count })
	} else {
		return NextResponse.json({ message: false, count: userApiLimit?.count })
	}
}
