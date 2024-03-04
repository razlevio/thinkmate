import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"

import { checkSubscription } from "@/lib/subscription"

export async function GET(req: NextRequest) {
	const { userId } = auth()
	if (!userId) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
	}

	const isSubscribed = await checkSubscription()
	if (isSubscribed) {
		return NextResponse.json({ message: true })
	} else {
		return NextResponse.json({ message: false })
	}
}
